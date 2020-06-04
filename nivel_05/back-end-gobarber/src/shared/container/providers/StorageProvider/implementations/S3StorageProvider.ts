import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import IStorageProvider from "../models/IStorafeProvider";

import aws, { S3 } from 'aws-sdk';
import mime from 'mime';



class S3StorageProvider implements IStorageProvider {

  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1',
    });
  }


  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    const ContentType = mime.getType(originalPath);

    if (!ContentType) {
      throw new Error('File Not found');
    }

    const fileContent = await fs.promises.readFile(originalPath);


    await this.client.putObject({
      Bucket: uploadConfig.config.aws.bucket,
      Key: file,
      ACL: 'public-read',
      Body: fileContent,
      ContentType,
      ContentDisposition: `inline; filename`
    }).promise();

    return file;
  }

  public async deleteFile(file: string): Promise<void> {

    await this.client.deleteObject({
      Bucket: 'app-gobarber-2',
      Key: file,
    }).promise();
  }

}

export default S3StorageProvider;
