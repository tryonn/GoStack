import User from "@modules/users/infra/typeorm/entities/User";
import AppError from '@shared/errors/AppError';
import IUserRepository from "../repositories/IUserRepository";
import { inject, injectable } from "tsyringe";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";

interface IRequest {
  name: string,
  email: string,
  password: string
}

@injectable()
class CreateUserService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('HashProvider')
    private hasProvider: IHashProvider,

    @inject('RedisCacheProvider')
    private redisCacheProvider: ICacheProvider,
  ) { };

  public async execute({ name, email, password }: IRequest): Promise<User> {

    const checkUserExist = await this.usersRepository.findByEmail(email);
    if (checkUserExist) {
      throw new AppError(' Email address already used.', 401);
    }

    const hashedPassword = await this.hasProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword
    });

    await this.redisCacheProvider.invalidatePrefix('providers-list');

    return user;

  }

}

export default CreateUserService;
