#!/bin/bash



home=$(pwd)
cd flask-ui/app/src/client
npm run build



cd ../..
docker build -t sh-api .



cd ..
kubectl create -f deployment.yaml



