#!/bin/bash

echo
echo "---------------------------------------------------------------------------------"
echo "Entering - Add Private Docker Registry Secret"
echo "---------------------------------------------------------------------------------"

# Using current server as Docker Registry Server
DOCKER_REGISTRY_SERVER=${HOSTNAME}

# Using current user as Docker Registry user
DOCKER_REGISTRY_USERNAME=${USER}

echo
echo "Enter your Docker Password"
stty -echo
read DOCKER_REGISTRY_PASSWORD
stty echo
echo


echo
echo "Creating Docker Registry Secret"
kubectl create secret docker-registry regcred \
--docker-server=${DOCKER_REGISTRY_SERVER} \
--docker-username=${DOCKER_REGISTRY_USERNAME} \
--docker-password=$DOCKER_REGISTRY_PASSWORD

echo
echo "---------------------------------------------------------------------------------"
echo "Leaving - Adding Private Docker Registry Secret"
echo "---------------------------------------------------------------------------------"


