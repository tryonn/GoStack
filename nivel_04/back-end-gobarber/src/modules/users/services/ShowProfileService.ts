import User from "@modules/users/infra/typeorm/entities/User";
import AppError from '@shared/errors/AppError';
import IUserRepository from "../repositories/IUserRepository";
import { inject, injectable } from "tsyringe";


interface Request {
  user_id: string;
}

@injectable()
class ShowProfileService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) { };

  public async execute({ user_id }: Request): Promise<User> {

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    return user;
  }
}

export default ShowProfileService;
