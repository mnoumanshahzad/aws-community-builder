import { Bucket, EventType } from '@aws-cdk/aws-s3';
import { SnsDestination } from '@aws-cdk/aws-s3-notifications';
import { Topic } from '@aws-cdk/aws-sns';
import { SqsSubscription } from '@aws-cdk/aws-sns-subscriptions';
import { Queue } from '@aws-cdk/aws-sqs';
import { App, Construct, Stack, StackProps } from '@aws-cdk/core';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const topic = new Topic(this, 'S3EventNotificationsTopic');
    const snsDestination = new SnsDestination(topic);

    const queue = new Queue(this, 'S3EventNotificationsSubscriber');
    topic.addSubscription(new SqsSubscription(queue));

    const bucketWithVersioning = new Bucket(this, 'BucketWithVersioning', {
      versioned: true,
    });

    bucketWithVersioning.addEventNotification(
      EventType.OBJECT_REMOVED,
      snsDestination,
    );

    const bucketWithoutVersioning = new Bucket(this, 'BucketWithoutVersioning');

    bucketWithoutVersioning.addEventNotification(
      EventType.OBJECT_REMOVED,
      snsDestination,
    );
  }
}

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new MyStack(app, 'my-stack-dev', { env: env });

app.synth();