import os
import psycopg
import json

POSTGRES_PASSWORD = os.environ["POSTGRES_PASSWORD"]

# home grown DB migrations these should be IDEMPOTENT statements
# these statements will be run before the database starts up
migrations = [
    # create lenses table
    "DROP TABLE IF EXISTS lenses;",
    "CREATE TABLE IF NOT EXISTS lenses (" "id UUID," "model_name TEXT," "zoom_type TEXT," "focal_length_min INTEGER," "focal_length_max INTEGER," "aperture_min FLOAT," "aperture_max FLOAT," "mounts TEXT[]" ");",
]

print(f"running {len(migrations)} migrations")

with psycopg.connect(dbname="postgres",
    user="postgres",
    password=POSTGRES_PASSWORD,
    host="database",
    port="5432",) as conn:
    with conn.cursor() as cur:
        for script in migrations:
            cur.execute(script)
        conn.commit()

    # import the data from data.json
    with open("data.json", "r") as f:
        data = f.read()
        lenses = json.loads(data)
        with conn.cursor() as cur:
            for idx, lens in enumerate(lenses):
                cur.execute(
                    "INSERT INTO lenses (id, model_name, zoom_type, focal_length_min, focal_length_max, aperture_min, aperture_max, mounts) " + 
                    " VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
                    (lens["id"], lens["name"], lens["zoom_type"], lens["min_focal_length"],
                    lens["max_focal_length"], lens.get("min_aperture", None), lens["max_aperture"], lens["mounts"]))
            conn.commit()
