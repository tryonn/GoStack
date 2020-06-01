import { container } from 'tsyringe';
import IStorageProvider from './models/IStorafeProvider';
import DiskStorageProvider from './implementations/DiskStorageProvider';

const providers = {
  diskStorageProvider: DiskStorageProvider,
}


container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers.diskStorageProvider,
);

