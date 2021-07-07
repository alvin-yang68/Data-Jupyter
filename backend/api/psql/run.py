from flask import request, session
from copy import deepcopy
import pandas as pd

from backend import psql as db
from .helpers import get_column_types
from ..commons import google_search, safe_exec


def run():
    # Parse JSON data from POST request body into Python dictionary.
    request_data = request.get_json()
    dataset_name = request_data['selectedDataset']
    editor_content = request_data['editorContent']

    # Prepare the default success response.
    response = {
        'console': 'Success',
        'hasCellError': False,
        'shouldUpdateBrowser': False,
    }

    # `context` is dictionary containing global variables allowed to be exposed
    # to the notebook cell. If it is in the session (user's cookies), then load it.
    # Otherwise, create an empty context.
    context = session.get('context', {})

    # Load SQL table as dataframe.
    df = pd.read_sql_table(
        table_name=dataset_name,
        con=db.engine
    )

    saved_df = deepcopy(df)

    # Prepare the `context`
    context['df'] = df
    context['google_search'] = google_search

    # Execute the code in notebook cell.
    response['console'], response['hasCellError'] = safe_exec(
        editor_content, context)

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

    # Save editor session (`context`) to client cookies.
    context.pop('__builtins__')
    context.pop('show')
    context.pop('df')
    context.pop('google_search')

    session['context'] = context

    return response
