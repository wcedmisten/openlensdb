import os
import psycopg
import json

POSTGRES_PASSWORD = os.environ["POSTGRES_PASSWORD"]

# home grown DB migrations these should be IDEMPOTENT statements
# these statements will be run before the database starts up
migrations = [
    # create lenses table
    "DROP TABLE IF EXISTS lenses;",
    "CREATE TABLE IF NOT EXISTS lenses (" "model_name TEXT," "zoom_type TEXT," "focal_length_min INTEGER," "focal_length_max INTEGER," "aperture_min FLOAT," "aperture_max FLOAT," "mounts TEXT[]" ");",
]

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
            for lens in lenses:
                cur.execute(
                    "INSERT INTO lenses (model_name, zoom_type, focal_length_min, focal_length_max, aperture_min, aperture_max, mounts) " + 
                    " VALUES (%s, %s, %s, %s, %s, %s, %s)",
                    (lens["model_name"], lens["zoom_type"], lens["focal_length_min"],
                    lens["focal_length_max"], lens["aperture_min"], lens["aperture_max"], lens["mounts"]))
            conn.commit()
