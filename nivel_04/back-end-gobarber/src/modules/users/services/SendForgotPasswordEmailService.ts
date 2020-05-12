import User from "@modules/users/infra/typeorm/entities/User";
import AppError from '@shared/errors/AppError';
import IUserRepository from "../repositories/IUserRepository";
import { inject, injectable } from "tsyringe";
import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";

interface IRequest {
  email: string,
}

@injectable()
class SendForgotPasswordEmailService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider

  ) { };

  public async execute({ email }: IRequest): Promise<void> {
    this.mailProvider.sendMail(email, "Pedido de recuperação de senha solicitado com sucesso.");
  }

}

export default SendForgotPasswordEmailService;
