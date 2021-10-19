# S3 Event Notifications

## Hypothesis

By using the `s3:ObjectRemoved:*` event filter for S3 Bucket Notification Events, deletion events from a versioned S3 Bucket and non-versioned S3 Bucket can be captured.

## Architectural Overview

The S3 Bucket Notification Events are pushed to an SNS Topic.  
The SNS Topic has a subscription for a SQS queue, and this is where the final events land.

![](diagram.png | width=100)

## Getting out

### Deploy the AWS resources

- Valid AWS Credentials
- npm install -g aws-cdk
- npm install
- npx projen
- cdk deploy

## Add and Delete S3 Objects

As a result of the deployment, two S3 buckets will be created.  
Try adding an object to both these S3 buckets and then delete these objects.  
You can use the AWS CLI of the S3 Web Console to do so.

## Results

As a consequence of your S3 object deletion, you should receive messages in the SQS queue.  
You can use the SQS Web Console to poll for messages and see that you received deletion notifications from both the S3 buckets.
