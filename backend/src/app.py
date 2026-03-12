from fastapi import FastAPI
import os
import psycopg

POSTGRES_PASSWORD = os.environ["POSTGRES_PASSWORD"]

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/lenses")
async def get_lenses(search: str = None):
    # fetch the lenses from the database and return them as JSON
    with psycopg.connect(dbname="postgres",
        user="postgres",
        password=POSTGRES_PASSWORD,
        host="database",
        port="5432",) as conn:
        with conn.cursor() as cur:
            # return a structured JSON list of lenses
            if search:
                cur.execute("SELECT model_name, zoom_type, focal_length_min, focal_length_max, aperture_min, aperture_max, mounts, id FROM lenses WHERE model_name ILIKE %s;", (f"%{search}%",))
            else:
                cur.execute("SELECT model_name, zoom_type, focal_length_min, focal_length_max, aperture_min, aperture_max, mounts, id FROM lenses;")
            rows = cur.fetchall()
            lenses = []
            for row in rows:
                lens = {
                    "model_name": row[0],
                    "zoom_type": row[1],
                    "focal_length_min": row[2],
                    "focal_length_max": row[3],
                    "aperture_min": row[4],
                    "aperture_max": row[5],
                    "mounts": row[6],
                    "id": row[7],
                }
                lenses.append(lens)
            return lenses


@app.get("/lens/{lens_id}")
async def get_lens(lens_id: str):
    # fetch the lens from the database and return it as JSON
    with psycopg.connect(dbname="postgres",
        user="postgres",
        password=POSTGRES_PASSWORD,
        host="database",
        port="5432",) as conn:
        with conn.cursor() as cur:
            # return a structured JSON list of lenses
            cur.execute("SELECT model_name, zoom_type, focal_length_min, focal_length_max, aperture_min, aperture_max, mounts, id FROM lenses WHERE id = %s;", (lens_id,))
            row = cur.fetchone()
            if row:
                lens = {
                    "model_name": row[0],
                    "zoom_type": row[1],
                    "focal_length_min": row[2],
                    "focal_length_max": row[3],
                    "aperture_min": row[4],
                    "aperture_max": row[5],
                    "mounts": row[6],
                    "id": row[7],
                }
                return lens
            return {"error": "Lens not found"}