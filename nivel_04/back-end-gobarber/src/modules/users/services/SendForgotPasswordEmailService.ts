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

    const checkUser = await this.usersRepository.findByEmail(email);

    if (!checkUser) {
      throw new AppError('User does not exist');
    }

    const { token } = await this.userTokenRepository.generate(checkUser.id);

    this.mailProvider.sendMail(email, `Pedido de recuperação de senha solicitado com sucesso. ${token}`);
  }

}

export default SendForgotPasswordEmailService;
