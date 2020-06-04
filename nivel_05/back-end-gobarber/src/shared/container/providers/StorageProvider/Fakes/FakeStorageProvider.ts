import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import IStorageProvider from "../models/IStorafeProvider";


class FakeStorageProvider implements IStorageProvider {

  private storageProvider: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.storageProvider.push(file);
    return file;
  }

  public async deleteFile(file: string): Promise<void> {

    const findIndex = this.storageProvider.findIndex(
      storageP => storageP === file,
    );

    this.storageProvider.splice(findIndex, 1);
  }
}

export default FakeStorageProvider;
