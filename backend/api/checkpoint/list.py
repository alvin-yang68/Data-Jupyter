from flask import Response, request, session, jsonify

from backend import mongo_checkpoint
from .helpers import listify_cursor


def checkpoint_list():
    database_model = request.args.get('databaseModel')
    col = mongo_checkpoint.db['checkpoints']

    # Return the list of checkpoints.
    if request.method == 'GET':
        checkpoint_details = col.find(
            filter={'databaseModel': database_model},
            projection={'_id': True, 'name': True}
        )
        return jsonify(listify_cursor(checkpoint_details))

    # Save checkpoint to database.
    if request.method == 'POST':
        new_checkpoint = request.get_json()

        # Save the editor session into the checkpoint.
        new_checkpoint['store'] = session['store']

        col.insert_one(new_checkpoint)
        return Response(status=200)
