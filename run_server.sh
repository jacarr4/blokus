#!/bin/sh

# set up virtual environment
echo "Setting up virtual environment..."
python3 -m venv venv
. venv/bin/activate

# install required packages
echo "Installing required packages..."
pip3 install Flask
pip3 install flask_socketio
pip3 install numpy

# run the server
echo "Running the server..."
python3 -m backend.socket_server
