/* import { SQSClient } from '@aws-sdk/client-sqs'
const sqsClient = new SQSClient({})
export { sqsClient } */

import { SQSClient } from '@aws-sdk/client-sqs'
// Set the AWS Region.
// const REGION = 'us-east-1' // e.g. "us-east-1"
// Create SQS service object.
const sqsClient = new SQSClient()
export { sqsClient }
// snippet-end:[sqs.JavaScript.createclientv3]
