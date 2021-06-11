from bson.json_util import dumps
import pandas as pd
from io import StringIO
from contextlib import redirect_stdout


def load_raw(cursor, indent=4):
    return dumps(cursor, indent=indent)


def load_table(cursor):
    df = pd.json_normalize(list(cursor), max_level=0)
    return df.to_markdown()


# def execute_code(code, db, user_session):
#     # Create a dictionary containing global variables allowed to be exposed to the notebook cell.
#     session_globals = {}
#     # session_globals = {name: eval(f'user_session.{name}') for name in dir(
#     #     user_session) if not name.startswith('__')}
#     for name in dir(user_session):
#         if not name.startswith('__'):
#             session_globals[name] = eval(f'user_session.{name}')

#     # Insert `db` cursor as one of the allowed global variables.
#     session_globals['db'] = db

#     # Inject code to save any newly defined variables in the notebook cell.
#     code += """\n_locals = {k:v for (k, v) in locals().items() if k != '__builtins__'}"""
#     session_globals['_locals'] = {}

#     # Capture any console output of the user's code.
#     f = StringIO()
#     with redirect_stdout(f):
#         exec(code, session_globals)
#     console_output = f.getvalue()

#     # Update `user_session` with any newly defined variables in the notebook cell.
#     for k, v in session_globals['_locals'].items():
#         if k == 'db' or k == '_locals':
#             continue
#         if k not in dir(user_session):
#             setattr(user_session, k, v)

#     return db, console_output

def execute_code(code, db, user_session):
    # Create a dictionary containing global variables allowed to be exposed to the notebook cell.
    context = {
        'db': db,
        'cell': user_session,
    }

    # Capture any console output of the user's code.
    f = StringIO()
    with redirect_stdout(f):
        exec(code, context)
    console_output = f.getvalue()

    if 'show' in context:
        filtered_db = context['show']
    else:
        filtered_db = db.find()

    return filtered_db, console_output
