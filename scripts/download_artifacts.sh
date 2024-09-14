#!/bin/bash

# Define variables
S3_BUCKET=rk-testing-codepipeline
ARTIFACTS_PATH=s3://$S3_BUCKET/build
DESTINATION_PATH=/opt/flux_dev

# Install AWS CLI if not already installed
if ! command -v aws &> /dev/null
then
    echo "AWS CLI not found, installing..."
    sudo apt-get update
    sudo apt-get install -y awscli
fi

# Download and extract artifacts
echo "Downloading artifacts from S3..."
aws s3 cp $ARTIFACTS_PATH $DESTINATION_PATH --recursive

echo "Artifacts downloaded and extracted."
