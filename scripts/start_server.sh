#!/bin/bash

# Navigate to the server directory
echo "Starting the server with PM2..."
pm2 stop all || true
pm2 start /opt/flux_dev/main.js
