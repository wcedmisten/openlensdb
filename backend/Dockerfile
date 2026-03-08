FROM python:3.12-slim

WORKDIR /backend

COPY ./requirements.txt /backend/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /backend/requirements.txt

COPY ./src /backend/app

# TODO: upgrade this to a production command
# https://www.uvicorn.org/deployment/#gunicorn

CMD [ "/bin/bash", "-c", "python3 /backend/app/migrate.py && fastapi run app.main:app --host 0.0.0.0 --port 4000"]
