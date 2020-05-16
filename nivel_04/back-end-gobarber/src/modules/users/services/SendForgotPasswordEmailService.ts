import User from "@modules/users/infra/typeorm/entities/User";
import AppError from '@shared/errors/AppError';
import IUserRepository from "../repositories/IUserRepository";
import { inject, injectable } from "tsyringe";
import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";
import IUserTokenRepository from "../repositories/IUserTokenRepository";

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
    private userTokenRepository: IUserTokenRepository

  ) { };

  public async execute({ email }: IRequest): Promise<void> {

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const { token } = await this.userTokenRepository.generate(user.id);

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[GOBARBER] Recuperação de Senha',
      templateData: {
        template: 'Olá, {{name}}: {{token}}',
        variables: {
          name: user.name,
          token,
        }
      }
    });
  }

}

export default SendForgotPasswordEmailService;
