from flask import session
from http import HTTPStatus


def reset_context():
    if 'context' in session:
        session.pop('context')
    return '', HTTPStatus.NO_CONTENT
