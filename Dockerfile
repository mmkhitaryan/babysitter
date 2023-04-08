FROM python:3
ENV PYTHONUNBUFFERED=1
WORKDIR /code
COPY . /code/
RUN pip install -r requirements.txt
RUN python3 manage.py collectstatic --noinput
ENTRYPOINT ["gunicorn", "nftadminparser.wsgi:application", "-b 0.0.0.0:8000"]