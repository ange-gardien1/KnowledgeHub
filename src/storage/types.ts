export interface StorageHandler {
    getPresignedUploadUrl: (key: string) => Promise<GetPresignedUploadUrlReturn>;
    deleteFile: (key: string) => Promise<boolean>;
    getDownloadUrl: (key: string) => Promise<string>;
  }
  
  interface GetPresignedUploadUrlReturn {
    url: string;
    fields?: Record<string, string>;
    service: "S3" ;
    contentType?: string;
  }
  