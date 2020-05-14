import FakeUsersRepository from '../repositories/Fakes/FakeUsersRepository';
import FakeUsersTokenRepository from '../repositories/Fakes/FakeUsersTokenRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import AppError from '@shared/errors/AppError';


let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUsersTokenRepository: FakeUsersTokenRepository;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {

  beforeEach(() => {

    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUsersTokenRepository = new FakeUsersTokenRepository();

    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUsersTokenRepository
    );

  });


  it('should be able to recover the password using the email', async () => {

    const sendEmail = jest.spyOn(fakeMailProvider, "sendMail");
    await fakeUsersRepository.create({
      name: "Lima",
      email: "lima@gmail.com",
      password: "123123"
    });
    await sendForgotPasswordEmailService.execute({
      email: "lima@gmail.com",
    });
    expect(sendEmail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password ', async () => {

    await expect(sendForgotPasswordEmailService.execute({
      email: "lima@gmail.com",
    })).rejects.toBeInstanceOf(AppError);

  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUsersTokenRepository, 'generate');
    await fakeUsersRepository.create({
      name: "Lima",
      email: "lima@gmail.com",
      password: "123123"
    });
    await sendForgotPasswordEmailService.execute({
      email: "lima@gmail.com",
    });
    expect(generateToken).toHaveBeenCalled();
  });
});
