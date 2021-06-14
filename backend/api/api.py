from flask import Blueprint, Response, request, session, abort, jsonify
import jsonpickle
from bson.objectid import ObjectId
from io import StringIO
from contextlib import redirect_stdout
from copy import deepcopy

from backend import mongo
from .editor_session import EditorSession
from .utils import load_raw, load_table, listify_with_str_oid

# Blueprint Configuration
api_bp = Blueprint('api_bp', __name__)


@api_bp.route('/api/dataset/<collection_name>', methods=['GET'])
def dataset(collection_name):
    # Store user session to cookies.
    session['editor'] = jsonpickle.encode(EditorSession(collection_name))

    col = mongo.db[collection_name]
    data = list(col.find())
    raw_data = load_raw(data)
    table_data = load_table(data)

    # Flask will automatically convert dictionary to JSON and wrap it in a Response obj.
    return {'raw': raw_data, 'table': table_data, 'console': 'Success loading dataset'}


@api_bp.route('/api/browser', methods=['GET', 'POST'])
def browser():
    # Parse JSON data from POST request body into Python dictionary.
    request_data = request.get_json()
    editor_content = request_data['editorContent']

    # Prepare the default response.
    response = {
        'raw': None,
        'table': None,
        'console': None,
        'hasCellError': False,
        'shouldUpdateBrowser': False,
    }

    if 'editor' not in session:
        abort(404)
    editor_session = jsonpickle.decode(session['editor'])
    col = mongo.db[editor_session.collection_name]

    # Create a dictionary containing global variables allowed to be exposed to the notebook cell.
    context = {
        'col': col,
        'store': editor_session,
    }

    editor_session_prev_state = deepcopy(editor_session)
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
    for name in vars(editor_session_prev_state):
        if vars(editor_session_prev_state)[name] != vars(editor_session)[name]:
            response['console'] = f'Error: Store fields should not be mutated once initialized.'
            response['hasCellError'] = True
            editor_session = editor_session_prev_state
            break

    # Update browser's data if the user asked for it.
    if 'show' in context:
        data = list(context['show'])
        response['raw'] = load_raw(data)
        response['table'] = load_table(data)
        response['shouldUpdateBrowser'] = True

    # Save editor session back to cookies.
    session['editor'] = jsonpickle.encode(editor_session)

    return response


@api_bp.route('/api/checkpoint', methods=['GET', 'POST'])
def checkpoint_list():
    col = mongo.db['checkpoints']

    # Return the list of checkpoints.
    if request.method == 'GET':
        checkpoint_details = col.find(
            filter={},
            projection={'_id': True, 'timestamp': True}
        )
        return jsonify(listify_with_str_oid(checkpoint_details))

    # Save checkpoint to database.
    if request.method == 'POST':
        request_data = request.get_json()
        col.insert_one(request_data)
        return Response(status=200)


@api_bp.route('/api/checkpoint/<id>', methods=['GET'])
def checkpoint_detail(id):
    col = mongo.db['checkpoints']
    doc = col.find(
        filter={'_id': ObjectId(id)},
        projection={'_id': False, 'timestamp': False}
    )
    return jsonify(list(doc)[0])
