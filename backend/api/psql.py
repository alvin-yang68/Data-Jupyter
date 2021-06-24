from flask import Blueprint, request, session
import jsonpickle
from io import StringIO
from contextlib import redirect_stdout
from copy import deepcopy
import pandas as pd

from backend import psql as db
from .store import Store
from .utils import get_column_types

# Blueprint Configuration
psql_bp = Blueprint('psql_bp', __name__, url_prefix='/psql')


@psql_bp.route('/run', methods=['GET', 'POST'])
def run():
    # Parse JSON data from POST request body into Python dictionary.
    request_data = request.get_json()
    dataset_name = request_data['selectedDataset']
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

    if 'df' in session:
        df = pd.DataFrame(session['df'])
    else:
        df = pd.read_sql_table(
            table_name=dataset_name,
            con=db.engine
        )

    # Create a dictionary containing global variables allowed to be exposed to the notebook cell.
    context = {
        'df': df,
        'store': store,
    }

    saved_store_state = deepcopy(store)
    saved_df = deepcopy(df)

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

    # If `df` was modified, save it to the database.
    if not df.equals(saved_df):
        df.to_sql(
            name=dataset_name,
            con=db.engine,
            if_exists='replace',
            index=False,
            dtype=get_column_types(dataset_name)
        )

    # Update browser's data if the user asked for it.
    if 'show' in context:
        data = context['show']
        if type(data) is str:
            response['console'] = data
        else:
            response['table'] = data.to_markdown()
            response['shouldUpdateBrowser'] = True

    # Save editor session back.
    session['store'] = jsonpickle.encode(store)

    # Save the `df` as a dictionary into the session.
    session['df'] = df.to_dict()

    return response
