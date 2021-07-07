def listify_cursor(cursor):
    docs = []
    for doc in cursor:
        doc['id'] = str(doc['_id'])
        del doc['_id']
        docs.append(doc)
    return docs
