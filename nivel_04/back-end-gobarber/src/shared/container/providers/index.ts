import { container } from 'tsyringe';
import IStorageProvider from './StorageProvider/models/IStorafeProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider
);
