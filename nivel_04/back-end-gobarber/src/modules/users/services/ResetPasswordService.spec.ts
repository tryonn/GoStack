import FakeUsersRepository from '../repositories/Fakes/FakeUsersRepository';
import FakeUsersTokenRepository from '../repositories/Fakes/FakeUsersTokenRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import AppError from '@shared/errors/AppError';
import ResetPasswordService from './ResetPasswordService';
import User from '../infra/typeorm/entities/User';


let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokenRepository: FakeUsersTokenRepository;
let resetPasswordService: ResetPasswordService;

describe('ResetPasswordService', () => {

  beforeEach(() => {

    fakeUsersRepository = new FakeUsersRepository();
    fakeUsersTokenRepository = new FakeUsersTokenRepository();

    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUsersTokenRepository
    );

  });


  it('should be able to reset the password', async () => {

    const user = await fakeUsersRepository.create({
      name: 'zezinho',
      email: 'zezinho@gmail.com',
      password: '123123'
    });

    const userToken = await fakeUsersTokenRepository.generate(user.id);

    await resetPasswordService.execute({
      token: userToken.token,
      password: '888555'
    });

    const userUpdate = await fakeUsersRepository.findById(user.id);

    expect(user?.password).toBe('888555');

  });
});
