from bson.json_util import dumps
import pandas as pd
from io import StringIO
from contextlib import redirect_stdout


def load_raw(cursor, indent=4):
    return dumps(cursor, indent=indent)


def load_table(cursor):
    df = pd.json_normalize(list(cursor), max_level=0)
    return df.to_markdown()


def execute_code(code, db, user_session):
    # Create a dictionary containing global variables allowed to be exposed to the notebook cell.
    context = {
        'db': db,
        'cell': user_session,
    }

    # Capture any console output of the user's code.
    try:
        f = StringIO()
        with redirect_stdout(f):
            exec(code, context)
        console_output = f.getvalue()
    except Exception as e:
        console_output = str(e)

    if 'show' in context:
        filtered_db = context['show']
    else:
        filtered_db = db.find()

    return filtered_db, console_output
