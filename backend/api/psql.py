from flask import Blueprint, request, session, jsonify
from sqlalchemy import inspect
from pathlib import Path
from io import StringIO
import jsonpickle
from io import StringIO
from contextlib import redirect_stdout
from copy import deepcopy
import pandas as pd

from backend import psql as db
from .store import Store
from .utils import get_column_types, google_search

# Blueprint Configuration
psql_bp = Blueprint('psql_bp', __name__, url_prefix='/psql')


@psql_bp.route('/dataset', methods=['GET', 'POST'])
def dataset():
    # Return the list of collection names in the database.
    if request.method == 'GET':
        insp = inspect(db.engine)
        return jsonify(insp.get_table_names())

    # Save a new dataset.
    if request.method == 'POST':
        # Note that `files` will only contain data if the request had enctype="multipart/form-data".
        file = request.files['file']
        content = file.read().decode('utf-8')

        # Convert into pandas DataFrame using `read_csv` (which takes filepath as arg,
        # so must convert the comma-seperated text into `StringIO` first).
        data_df = pd.read_csv(StringIO(content))

        # Save DataFrame as a SQL table.
        data_df.to_sql(
            name=Path(file.filename).stem,
            con=db.engine,
            if_exists='replace',
            index=False
        )

        return file.filename


@psql_bp.route('/run', methods=['POST'])
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

    # Load SQL table as dataframe.
    df = pd.read_sql_table(
        table_name=dataset_name,
        con=db.engine
    )

    # Create a dictionary containing global variables allowed to be exposed to the notebook cell.
    context = {
        'df': df,
        'store': store,
        'google_search': google_search,
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

    return response
