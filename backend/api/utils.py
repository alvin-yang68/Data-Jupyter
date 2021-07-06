from bson.json_util import dumps
import pandas as pd
from googleapiclient.discovery import build
import json
from flask import current_app as app

from backend import psql as db


def load_raw(cursor, indent=4):
    return dumps(cursor, indent=indent)


def load_table(cursor):
    df = pd.json_normalize(list(cursor), max_level=0)
    return df.to_markdown()


def get_column_types(table_name):
    model = db.Table(table_name, db.metadata, autoload=True,
                     autoload_with=db.engine)
    return {str(c.name): c.type for c in model.columns}


def listify_cursor(cursor):
    docs = []
    for doc in cursor:
        doc['id'] = str(doc['_id'])
        del doc['_id']
        docs.append(doc)
    return docs


def google_search(search_term: str, **kwargs) -> json:
    """Perform a Google search using Custom Search API"""
    # Build request
    service = build("customsearch", "v1",
                    developerKey=app.config['GOOGLE_API_KEY'])
    # Execute request
    query_result = service.cse().list(
        q=search_term,
        cx=app.config['GOOGLE_SEARCH_ENGINE_ID'],
        **kwargs
    ).execute()

    return query_result
