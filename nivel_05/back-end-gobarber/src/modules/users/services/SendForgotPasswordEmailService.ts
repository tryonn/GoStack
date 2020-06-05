import "reflect-metadata"

import { inject, injectable } from "tsyringe";

import AppError from '@shared/errors/AppError';
import IUserRepository from "../repositories/IUserRepository";
import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";
import IUserTokenRepository from "../repositories/IUserTokenRepository";

import path from 'path';

interface IRequest {
  email: string,
}

@injectable()
class SendForgotPasswordEmailService {

  constructor(

    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokenRepository: IUserTokenRepository,

  ) {
    console.log('wewe');
  };

  public async execute({ email }: IRequest): Promise<void> {

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const { token } = await this.userTokenRepository.generate(user.id);

    const forogotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[GOBARBER] Recuperação de Senha',
      templateData: {
        file: forogotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
        }
      }
    });
  }

}

export default SendForgotPasswordEmailService;
