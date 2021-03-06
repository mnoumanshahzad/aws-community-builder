const { AwsCdkTypeScriptApp } = require('projen');
const project = new AwsCdkTypeScriptApp({
  cdkVersion: '1.95.2',
  defaultReleaseBranch: 'main',
  name: 's3-event-notifications',
  cdkDependencies: [
    '@aws-cdk/aws-s3-notifications',
    '@aws-cdk/aws-s3',
    '@aws-cdk/aws-sns-subscriptions',
    '@aws-cdk/aws-sns',
    '@aws-cdk/aws-sqs',
  ],
  deps: [
    'cdk-dia',
  ],

  // cdkDependencies: undefined,        /* Which AWS CDK modules (those that start with "@aws-cdk/") this app uses. */
  // deps: [],                          /* Runtime dependencies of this module. */
  // description: undefined,            /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],                       /* Build dependencies for this module. */
  // packageName: undefined,            /* The "name" in package.json. */
  // projectType: ProjectType.UNKNOWN,  /* Which type of project this is (library/app). */
  // release: undefined,                /* Add release management to this project. */
});
project.synth();