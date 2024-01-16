#!/bin/bash

# Navigating to the 'src' directory
cd src

# Building the project using npm
npm run build

# Going back to the parent directory
cd ..

# Copying the build directory to the specified location
sudo cp -R build/ /var/www/html/my-react-app/