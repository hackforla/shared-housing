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


curl \
    --header "Content-Type: application/json" \
    --request GET \
    "http://localhost:5000/api/v2/candidatequestions/"

curl \
    --header "Content-Type: application/json" \
    --request GET \
    "http://localhost:5000/api/v2/locationquestions/"



curl \
    --header "Content-Type: application/json" \
    --request GET \
    "http://localhost:5000/api/v2/locationresponsevalues/"



curl \
    --header "Content-Type: application/json" \
    --request GET \
    "http://localhost:5000/api/v2/candidateresponsevalues/"



curl \
    --header "Content-Type: application/json" \
    --request POST \
    --data '{"text": "What is your favorite color?", "responseValues": ["black", "blue", "yellow", "purple", "white"]}' \
    "http://localhost:5000/api/v2/locationquestions/"
    # --data '{"text": "What is your favorite animal?", "responseValues": ["tiger", "pigeon", "stork", "snake", "cat"]}' \

curl \
    --header "Content-Type: application/json" \
    --request POST \
    --data '{"text": "What is your preferred color?", "responseValues": ["black", "blue", "yellow", "purple", "white"]}' \
    "http://localhost:5000/api/v2/candidatequestions/"


# locationresponsevalues
