import AppError from '@shared/errors/AppError';
import IUserRepository from "../repositories/IUserRepository";
import { inject, injectable } from "tsyringe";
import IUserTokenRepository from "../repositories/IUserTokenRepository";
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import { addHours, isAfter } from 'date-fns';

interface IRequest {
  token: string,
  password: string,
}

@injectable()
class ResetPasswordService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('userTokenRepository')
    private userTokenRepository: IUserTokenRepository,

    @inject('HashProvider')
    private hashToken: IHashProvider


  ) { };

  public async execute({ token, password }: IRequest): Promise<void> {

    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does  not exists');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const tokenCreatAt = userToken.created_at;
    const compareDate = addHours(tokenCreatAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token User expired');
    }

    user.password = await this.hashToken.generateHash(password);

    await this.usersRepository.save(user);
  }

}

export default ResetPasswordService;
