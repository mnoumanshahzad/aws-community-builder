import boto3
import os

def lambda_handler(event, context):
  bucket_without_versioning = os.environ['BUCKET_WITHOUT_VERSIONING']
  bucket_with_versioning = os.environ['BUCKET_WITH_VERSIONING']

  some_binary_data = b'Here we have some data'

  s3 = boto3.resource('s3')
  
  object_without_versioning = s3.Object(bucket_without_versioning, 'dummy.txt')
  object_without_versioning.put(Body=some_binary_data)

  object_with_versioning = s3.Object(bucket_with_versioning, 'dummy.txt')
  object_with_versioning.put(Body=some_binary_data)

  object_without_versioning.delete()
  object_with_versioning.delete()
