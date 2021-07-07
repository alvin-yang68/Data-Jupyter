from flask import request, jsonify
from sqlalchemy import inspect
from pathlib import Path
from io import StringIO
from io import StringIO
import pandas as pd

from backend import psql as db


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
