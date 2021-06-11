from flask import Blueprint, request, session, abort
import jsonpickle

from backend import mongo
from .user_session import UserSession
from .utils import load_raw, load_table, execute_code

# Blueprint Configuration
api_v1_bp = Blueprint('api_v1_bp', __name__)


@api_v1_bp.route('/api/v1/load', methods=['GET', 'POST'])
def load():
    # Parse JSON data from request into Python dictionary.
    request_data = request.get_json()
    collection_name = request_data['selectedDataset']

    # Store user session to cookies.
    session['user'] = jsonpickle.encode(UserSession(collection_name))

    db = mongo.db[collection_name]
    data = list(db.find())
    raw_data = load_raw(data)
    table_data = load_table(data)

    # Flask will automatically convert dictionary to JSON.
    return {'raw': raw_data, 'table': table_data, 'console': 'Success loading dataset'}


@api_v1_bp.route('/api/v1/update', methods=['GET', 'POST'])
def update():
    request_data = request.get_json()
    editor_content = request_data['editorContent']

    if 'user' not in session:
        abort(404)
    user_session = jsonpickle.decode(session['user'])
    db = mongo.db[user_session.collection_name]

    # Execute the code in notebook cell and render results.
    data, console_output = execute_code(
        editor_content, db, user_session)
    raw_data = load_raw(data)
    table_data = load_table(data)

    # Save user session back to cookies.
    session['user'] = jsonpickle.encode(user_session)

    return {'raw': raw_data, 'table': table_data, 'console': console_output}
