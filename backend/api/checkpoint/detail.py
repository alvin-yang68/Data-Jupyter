from flask import session
from bson.objectid import ObjectId

from backend import mongo_checkpoint


def checkpoint_detail(id):
    col = mongo_checkpoint.db['checkpoints']
    doc = col.find_one(
        filter={'_id': ObjectId(id)},
        projection={'_id': False, 'name': False}
    )

    # Restore the editor session from the checkpoint.
    session['store'] = doc.pop('store')

    # Flask will automatically convert dictionary to JSON and wrap it in a Response obj.
    return doc
