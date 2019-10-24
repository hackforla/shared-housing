FROM node:alpine as clientBuilder

COPY ./client /app

WORKDIR /app
RUN apk update && apk add bash
RUN npm install
RUN npm run build:local

FROM alpine:latest

RUN apk update
RUN apk add --no-cache ca-certificates
RUN apk add -u python3 

# https://github.com/frol/docker-alpine-python3/blob/master/Dockerfile
RUN python3 -m ensurepip && \
    rm -r /usr/lib/python*/ensurepip && \
    pip3 install --no-cache --upgrade pip setuptools wheel

RUN apk add -u python3-dev py3-gunicorn postgresql-dev build-base


WORKDIR /app 


COPY --from=clientBuilder /app/dist ./static
COPY --from=clientBuilder /app/dist/index.html ./templates/index.html

COPY ./server .

RUN pip3 install -r requirements.txt
# COPY server/templates /app/templates
# COPY server/static /app/static

RUN chmod 777 /app/startup.sh

ENV MONGO_USERNAME h4la
ENV MONGO_PASSWORD metro
ENV MONGO_DATABASE sharedhousing

EXPOSE 80

ENTRYPOINT ["/app/startup.sh"]

