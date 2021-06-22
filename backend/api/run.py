from flask import Blueprint, request, session
import jsonpickle
from io import StringIO
from contextlib import redirect_stdout
from copy import deepcopy

from backend import mongo
from .store import Store
from .utils import load_raw, load_table

# Blueprint Configuration
run_bp = Blueprint('api_bp', __name__, url_prefix='/run')


@run_bp.route('', methods=['GET', 'POST'])
def run():
    # Parse JSON data from POST request body into Python dictionary.
    request_data = request.get_json()
    collection_name = request_data['selectedDataset']
    editor_content = request_data['editorContent']

    # Prepare the default response.
    response = {
        'console': 'Success',
        'hasCellError': False,
        'shouldUpdateBrowser': False,
    }

    if 'store' not in session:
        # Store editor session to cookies.
        session['store'] = jsonpickle.encode(Store())
    store = jsonpickle.decode(session['store'])

    # Create a dictionary containing global variables allowed to be exposed to the notebook cell.
    context = {
        'col': mongo.db[collection_name],
        'store': store,
    }

    store_prev_state = deepcopy(store)
    response['hasCellError'] = False

    # Execute the code in notebook cell and capture any console output.
    try:
        f = StringIO()
        with redirect_stdout(f):
            exec(editor_content, context)
        response['console'] = f.getvalue()
    except Exception as e:
        response['console'] = str(e)
        response['hasCellError'] = True

    # Check if any variables/functions in `store` had been modified.
    for name in vars(store_prev_state):
        if vars(store_prev_state)[name] != vars(store)[name]:
            response['console'] = f'Error: Store fields should not be mutated once initialized.'
            response['hasCellError'] = True
            store = store_prev_state
            break

    # Update browser's data if the user asked for it.
    if 'show' in context:
        data = list(context['show'])
        response['raw'] = load_raw(data)
        response['table'] = load_table(data)
        response['shouldUpdateBrowser'] = True

    # Save editor session back to cookies.
    session['store'] = jsonpickle.encode(store)

    return response
