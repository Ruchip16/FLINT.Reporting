#!/bin/bash


echo
echo "---------------------------------------------------------------------------------"
echo "Building component"
echo "---------------------------------------------------------------------------------"



# -------------------------------------------------------------------------------------
# INITIALIZE VARIABLES
# -------------------------------------------------------------------------------------

echo
echo "Initializing variables"
BASEDIR="$( cd "$( dirname "$0" )" && pwd )"



# -------------------------------------------------------------------------------------
# SET WORKING DIRECTORY
# -------------------------------------------------------------------------------------

echo
echo "Setting the working directory"
cd $BASEDIR



# -------------------------------------------------------------------------------------
# INSTALL DEPENDENCIES
# -------------------------------------------------------------------------------------

echo
echo "Installing npm dependencies"
echo
npm install



# -------------------------------------------------------------------------------------
# BUILD COMPONENT
# -------------------------------------------------------------------------------------

echo
echo "Building component for production environment"
echo
#ng build --prod
ng build --prod --base-href /client/



echo
echo "---------------------------------------------------------------------------------"
echo "Done building component"
echo "---------------------------------------------------------------------------------"
