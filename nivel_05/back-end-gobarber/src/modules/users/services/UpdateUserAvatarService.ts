import { inject, injectable } from "tsyringe";

import User from "@modules/users/infra/typeorm/entities/User";
import AppError from '@shared/errors/AppError';
import IUserRepository from "../repositories/IUserRepository";
import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorafeProvider";


interface Request {
  user_id: string,
  avatarFilename: string
}

@injectable()
class UpdateUserAvatarService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) { };

  public async execute({ user_id, avatarFilename }: Request): Promise<User> {

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    if (user.avatar) {
      this.storageProvider.deleteFile(user.avatar);
    }

    const fileName = await this.storageProvider.saveFile(avatarFilename);

    user.avatar = fileName;
    await this.usersRepository.save(user);

    return user;

  }
}

export default UpdateUserAvatarService;
