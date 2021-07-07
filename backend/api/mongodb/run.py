from flask import request, session

from backend import mongo_demo
from .helpers import load_raw, load_table
from ..commons import safe_exec, google_search


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

    # `context` is dictionary containing global variables allowed to be exposed
    # to the notebook cell. If it is in the session (user's cookies), then load it.
    # Otherwise, create an empty context.
    context = session.get('context', {})

    # Prepare the `context`
    context['col'] = mongo_demo.db[collection_name]
    context['google_search'] = google_search

    # Execute the code in notebook cell.
    response['console'], response['hasCellError'] = safe_exec(
        editor_content, context)

    # Update browser's data if the user asked for it.
    if 'show' in context:
        data = list(context['show'])
        response['raw'] = load_raw(data)
        response['table'] = load_table(data)
        response['shouldUpdateBrowser'] = True

    # Save editor session back.
    context.pop('__builtins__')
    context.pop('show')
    context.pop('col')
    context.pop('google_search')

    session['context'] = context

    return response
