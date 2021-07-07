from flask import request, jsonify
from pathlib import Path
from bson.json_util import loads

from backend import mongo_demo


def dataset():
    # Return the list of collection names in the database.
    if request.method == 'GET':
        return jsonify(mongo_demo.db.list_collection_names())

    # Save a new dataset.
    if request.method == 'POST':
        # Note that `files` will only contain data if the request had enctype="multipart/form-data".
        file = request.files['file']
        content = file.read().decode('utf-8')

        # Stem extension in the filename
        filename = Path(file.filename).stem

        # Create a new collection or overwrite an existing one with the same name, and
        # insert the uploaded dataset.
        mongo_demo.db[filename].insert_many(loads(content))

        return filename
