#!/bin/sh

curl \
    --header "Content-Type: application/json" \
    --request POST \
    --data '{"candidateQuestion": "do you smoke?", "locationQuestion": "do you allow smokers?", "isConstraint": false, "inverseRelationship": false}' \
    "http://localhost:5000/api/v1/questions/"

curl \
    --header "Content-Type: application/json" \
    --request POST \
    --data '{"name": "josh"}' \
    "http://localhost:5000/api/v1/candidates/"

curl \
    --header "Content-Type: application/json" \
    --request POST \
    --data '{"name": "josh"}' \
    "http://localhost:5000/api/v1/responses/"

