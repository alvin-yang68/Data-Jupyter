from bson.json_util import dumps
import pandas as pd


def load_raw(cursor, indent=4):
    return dumps(cursor, indent=indent)


def load_table(cursor):
    df = pd.json_normalize(list(cursor), max_level=0)
    return df.to_markdown()
