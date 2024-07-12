import { CloudWatchLogsClient } from "@aws-sdk/client-cloudwatch-logs";
import { S3Client } from "@aws-sdk/client-s3";
import { SES as SESClass } from "@aws-sdk/client-ses";
import { TranscribeClient } from "@aws-sdk/client-transcribe";

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } = process.env;

if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !AWS_REGION) {
  throw new Error("Unable to find AWS Configuration");
}

const AWS_V3_CONFIG = {
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION,
  },
};

const s3Client = new S3Client(AWS_V3_CONFIG);

const transcribeClient = new TranscribeClient(AWS_V3_CONFIG);

const cloudwatchLogsClient = new CloudWatchLogsClient(AWS_V3_CONFIG);

export { s3Client, transcribeClient, cloudwatchLogsClient };
