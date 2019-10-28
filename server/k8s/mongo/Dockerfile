FROM mongo

COPY ./initsharedhousingdb.js /docker-entrypoint-initdb.d

ENV MONGO_INITDB_ROOT_USERNAME h4la
ENV MONGO_INITDB_ROOT_PASSWORD metro
ENV MONGO_INITDB_DATABASE sharedhousing
