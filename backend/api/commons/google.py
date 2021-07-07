from flask import current_app as app
from googleapiclient.discovery import build
import json


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
