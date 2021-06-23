from bson.json_util import dumps
import pandas as pd

from backend import psql as db


def load_raw(cursor, indent=4):
    return dumps(cursor, indent=indent)


def load_table(cursor):
    df = pd.json_normalize(list(cursor), max_level=0)
    return df.to_markdown()


def get_column_types(table_name):
    model = db.Table(table_name, db.engine, autoload=True,
                     autoload_with=db.engine)
    return {str(k): v for k, v in model.columns}


def listify_cursor(cursor):
    docs = []
    for doc in cursor:
        doc['id'] = str(doc['_id'])
        del doc['_id']
        docs.append(doc)
    return docs
