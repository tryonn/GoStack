
import User from "@modules/users/infra/typeorm/entities/User";
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import IUserRepository from "../repositories/IUserRepository";
import { inject, injectable } from "tsyringe";
import BCryptHashProvider from "../providers/HashProvider/implementations/BCryptHashProvider";

interface IRequest {
  email: string,
  password: string
}

interface Response {
  user: User,
  token: string
}

@injectable()
class AuthenticateSessionService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: BCryptHashProvider,
  ) { };

  public async execute({ email, password }: IRequest): Promise<Response> {

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }


    const passwordMatched = await this.hashProvider.compareHash(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });


    return { user, token };

  }
}

export default AuthenticateSessionService;
