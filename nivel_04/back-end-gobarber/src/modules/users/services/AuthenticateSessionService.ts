
import User from "@modules/users/infra/typeorm/entities/User";
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import IUserRepository from "../repositories/IUserRepository";
import { inject, injectable } from "tsyringe";

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
    private usersRepository: IUserRepository
  ) { };

  public async execute({ email, password }: IRequest): Promise<Response> {

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }


    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    }

  }
}

export default AuthenticateSessionService;
