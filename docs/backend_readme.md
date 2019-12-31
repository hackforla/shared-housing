# BACKEND GUIDE STUFF  

This guide will cover the current state of the development using a top down approach. FYI frontend uses react.  
The application stack is:  
kubernetes - container orchestration
docker - container runtime
flask - web framework
python - programming language
mongodb - storage

TODO: needs in depth decisions for why we chose the following technologies  

## Kubernetes  
Relevant files: deployment.yaml, service.yaml  
https://kubernetes.io/docs/home/  

## Docker  
Relevant files: Dockerfile  
https://docs.docker.com/get-started/  

## Flask  
Relevant files: app.py   
https://flask.palletsprojects.com/en/1.1.x/  

## Python  
Relevant files: .py files  
https://docs.python.org/3/  

# Local set up  - TODO: needs explanations
Below are instructions for setting up your local machine. (These instructions were done on a mac so it might be different for you)  

## python
install python3.x  
upgrade pip - this is the python package installer https://pip.pypa.io/en/stable/  
set up your IDE  
set up your environment with desired software (git is necessary)  
fork project to your own repo  
clone project  
set upstream to hack for la  
git pull upstream master to keep your local code up to date  
git push to make sure your fork's master is up to date  

## sample javascript project
run `brew install node`  
some node command to transpile  

## kubernetes/docker  
download docker dmg from docker's website and enable kubernetes from preferences  
run `brew cask install minikube` https://kubernetes.io/docs/tasks/tools/install-minikube/  
run `minikube start --vm-driver=hyperkit`  
run `eval $(minikube docker-env)`  
run `docker build -t sh-api .` from where the docker file is located (the apps directory within /server/k8s/flask-ui/)  
run `kubectl create -f ../deployment.yaml`  
run `kubectl create -f ../service.yaml`  
to check your k8s related things use `kubectl get pods`  
AND... probably some more errors. We are still figuring this out ;)

Now back to the guide. 
To look at current tasks look at the issue section github https://github.com/hackforla/shared-housing/issues  


## Get started

### Build

### Deploy
