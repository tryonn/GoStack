import { resolve } from 'path';
import multer, { StorageEngine } from 'multer';
import crypto from 'crypto';

const tmpFolder = resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 's3' | 'disk';

  tmpFolder: string;
  uploadsFolder: string;

  multer: {
    storage: multer.StorageEngine;
  };

  configs: {
    disk: {};
    aws: {
      bucket: string,
    }
  };
}

export default {
  driver: process.env.STORAGE_DRIVER || 'disk',
  tmpFolder,
  uploadsFolder: resolve(tmpFolder, 'uploads'),
  multer: {
    /*disk: {*/
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {

        console.log("file::::::::  " + file + " :::::::::::::")

        const fileHash = crypto.randomBytes(10).toString('HEX');
        const fileName = `${fileHash}-${file.originalname}`;
        return callback(null, fileName);
      }
    }),
    /*}*/
  },
  configs: {
    disk: {},
    aws: {
      bucket: 'app-gobarber-2',
    },
  }
} as IUploadConfig;
