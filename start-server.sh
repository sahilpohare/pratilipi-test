#!/bin/bash

# Check if NX_APP argument is provided
if [ $# -eq 0 ]; then
  echo "Usage: $0 $1"
  exit 1
fi

# Assign the first argument to the NX_APP variable
NX_APP="$1"

# Check if the specified NX_APP directory exists
if [ ! -d "dist/apps/$NX_APP" ]; then
  echo "Error: The directory 'dist/apps/$NX_APP' does not exist."
  exit 1
fi

# Run the Node.js script for the specified NX_APP
node "dist/apps/$NX_APP"