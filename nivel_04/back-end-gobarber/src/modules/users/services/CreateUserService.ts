import User from "@modules/users/infra/typeorm/entities/User";

import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';
import IUserRepository from "../repositories/IUserRepository";

interface IRequest {
  name: string,
  email: string,
  password: string
}

class CreateUserService {

  constructor(private usersRepository: IUserRepository) { };

  public async execute({ name, email, password }: IRequest): Promise<User> {

    const checkUserExist = await this.usersRepository.findByEmail(email);
    if (checkUserExist) {
      throw new AppError(' Email address already used.', 401);
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword
    });

    return user;

  }

}

export default CreateUserService;
