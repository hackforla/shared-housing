FROM postgres:alpine

COPY ./initsharedhousingdb.sql /docker-entrypoint-initdb.d

ENV POSTGRES_USER sharedhousing
ENV POSTGRES_PASSWORD shadmin0
ENV POSTGRES_DB sharedhousingdb
