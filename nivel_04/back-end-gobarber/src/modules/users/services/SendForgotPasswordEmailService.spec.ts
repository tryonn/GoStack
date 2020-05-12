import FakeUsersRepository from '../repositories/Fakes/FakeUserRepository';
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

describe('SendForgotPasswordEmail', () => {

  it('should be able to recover the password using the email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendEmail = jest.spyOn(fakeMailProvider, "sendMail");

    const sendForgotPasswordEmailService = new SendForgotPasswordEmailService(fakeUsersRepository, fakeMailProvider);

    await fakeUsersRepository.create({
      name: "Lima",
      email: "lima@gmail.com",
      password: "123123"
    });

    await sendForgotPasswordEmailService.execute({
      email: "lima@gmail.com",
    });


    expect(sendEmail).toHaveBeenCalledWith("sendMail");


  });
});
