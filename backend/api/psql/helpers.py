from backend import psql as db


def get_column_types(table_name):
    model = db.Table(table_name, db.metadata, autoload=True,
                     autoload_with=db.engine)
    return {str(c.name): c.type for c in model.columns}
