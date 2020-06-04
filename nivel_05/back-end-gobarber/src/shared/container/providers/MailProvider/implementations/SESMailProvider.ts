import nodemailer, { Transporter } from 'nodemailer';
import IMailProvider from "../models/IMailProvider";
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';
import { inject, injectable } from 'tsyringe';
import aws from 'aws-sdk';
import mail from '@config/mail';


@injectable()
export default class SESMailProvider implements IMailProvider {

  private client: Transporter;

  constructor(

    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,

  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: 'us-west-2',
      })
    });
  }

  public async sendMail({ from, to, subject, templateData }: ISendMailDTO): Promise<void> {

    const { email, name } = mail.defaults.from;

    await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });
  }
}
