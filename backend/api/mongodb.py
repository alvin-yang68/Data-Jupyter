from flask import Blueprint, request, session, jsonify
from pathlib import Path
from bson.json_util import loads
import jsonpickle
from io import StringIO
from contextlib import redirect_stdout
from copy import deepcopy

from backend import mongo_data
from .store import Store
from .utils import load_raw, load_table

# Blueprint Configuration
mongodb_bp = Blueprint('mongodb_bp', __name__, url_prefix='/mongodb')


@mongodb_bp.route('/dataset', methods=['GET', 'POST'])
def dataset():
    # Return the list of collection names in the database.
    if request.method == 'GET':
        return jsonify(mongo_data.db.list_collection_names())

    # Save a new dataset.
    if request.method == 'POST':
        # Note that `files` will only contain data if the request had enctype="multipart/form-data".
        file = request.files['file']
        content = file.read().decode('utf-8')

        # Stem extension in the filename
        filename = Path(file.filename).stem

        # Create a new collection or overwrite an existing one with the same name, and
        # insert the uploaded dataset.
        mongo_data.db[filename].insert_many(loads(content))

        return filename


@mongodb_bp.route('/run', methods=['POST'])
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
        # Store editor session.
        session['store'] = jsonpickle.encode(Store())
    store = jsonpickle.decode(session['store'])

    # Create a dictionary containing global variables allowed to be exposed to the notebook cell.
    context = {
        'col': mongo_data.db[collection_name],
        'store': store,
    }

    saved_store_state = deepcopy(store)

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
    for name in vars(saved_store_state):
        if vars(saved_store_state)[name] != vars(store)[name]:
            response['console'] = f'Error: Store fields should not be mutated once initialized.'
            response['hasCellError'] = True
            store = saved_store_state
            break

    # Update browser's data if the user asked for it.
    if 'show' in context:
        data = list(context['show'])
        response['raw'] = load_raw(data)
        response['table'] = load_table(data)
        response['shouldUpdateBrowser'] = True

    # Save editor session.
    session['store'] = jsonpickle.encode(store)

    return response
