import uuid


def random_string():
    return str(uuid.uuid4())[:8]
