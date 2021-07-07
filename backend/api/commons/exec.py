from io import StringIO
from contextlib import redirect_stdout


def safe_exec(code: str, context: dict = {}) -> "tuple[bool, str]":
    """Execute the code in a conservative global context and capture any console output."""
    output = ''
    error = False

    try:
        f = StringIO()
        with redirect_stdout(f):
            exec(code, context)
        output = f.getvalue()
    except Exception as e:
        output = str(e)
        error = True

    return output, error
