FROM alpine:latest

RUN apk update

RUN apk add --no-cache ca-certificates
RUN apk add -u python3 

# https://github.com/frol/docker-alpine-python3/blob/master/Dockerfile
RUN python3 -m ensurepip && \
    rm -r /usr/lib/python*/ensurepip && \
    pip3 install --no-cache --upgrade pip setuptools wheel

RUN apk add -u python3-dev py3-gunicorn postgresql-dev build-base

RUN pip3 install flask gunicorn psycopg2-binary

WORKDIR /app

COPY src/startup.sh /app/startup.sh
COPY src/server.py /app/server.py
COPY src/templates /app/templates
COPY src/static /app/static

RUN chmod 777 /app/startup.sh

EXPOSE 80

ENTRYPOINT ["/app/startup.sh"]




