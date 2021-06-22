from flask import Blueprint, Response, request, session, jsonify
from bson.objectid import ObjectId

from backend import mongo
from .utils import listify_cursor

# Blueprint Configuration
checkpoint_bp = Blueprint('checkpoint_bp', __name__, url_prefix='/checkpoint')


@checkpoint_bp.route('/', methods=['GET', 'POST'])
def checkpoint_list():
    col = mongo.db['checkpoints']

    # Return the list of checkpoints.
    if request.method == 'GET':
        checkpoint_details = col.find(
            filter={},
            projection={'_id': True, 'timestamp': True}
        )
        return jsonify(listify_cursor(checkpoint_details))

    # Save checkpoint to database.
    if request.method == 'POST':
        new_checkpoint = request.get_json()

        # Save the editor session into the checkpoint.
        new_checkpoint['store'] = session['store']

        col.insert_one(new_checkpoint)
        return Response(status=200)


@checkpoint_bp.route('/<id>', methods=['GET'])
def checkpoint_detail(id):
    col = mongo.db['checkpoints']
    doc = col.find_one(
        filter={'_id': ObjectId(id)},
        projection={'_id': False, 'timestamp': False}
    )

    # Restore the editor session from the checkpoint.
    session['store'] = doc.pop('store')

    # Flask will automatically convert dictionary to JSON and wrap it in a Response obj.
    return doc
