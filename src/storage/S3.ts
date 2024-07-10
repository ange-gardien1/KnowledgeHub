import { DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { StorageHandler } from "./types";
import { s3Client } from "@/config/aws";

export class S3Handler implements StorageHandler {
  BUCKET_NAME: string;

  constructor(bucketName: string) {
    this.BUCKET_NAME = bucketName;
  }
  async getPresignedUploadUrl(key: string) {
    const { url, fields } = await createPresignedPost(s3Client, {
      Bucket: this.BUCKET_NAME,
      Key: `public/${key}`,
      Expires: 60,
    });
    return { url, fields, service: "S3" } as const;
  }

  async deleteFile(key: string) {
    const command = new DeleteObjectCommand({
      Bucket: this.BUCKET_NAME,
      Key: `public/${key}`,
    });
    const res = await s3Client.send(command);
    return res.DeleteMarker ?? false;
  }

  async getDownloadUrl(key: string) {
    const command = new GetObjectCommand({
      Bucket: this.BUCKET_NAME,
      Key: `public/${key}`,
    });
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    return url;
  }
}
