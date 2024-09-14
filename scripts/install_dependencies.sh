#!/bin/bash

# Navigate to the server directory
cd /opt/flux_dev/

echo "Installing global dependencies (if necessary)..."
# Example: Install PM2 globally if not installed
npm install pm2@latest -g
