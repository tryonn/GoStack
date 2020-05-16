import FakeUsersRepository from '../repositories/Fakes/FakeUsersRepository';
import FakeUsersTokenRepository from '../repositories/Fakes/FakeUsersTokenRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import AppError from '@shared/errors/AppError';
import ResetPasswordService from './ResetPasswordService';
import User from '../infra/typeorm/entities/User';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';


let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokenRepository: FakeUsersTokenRepository;
let resetPasswordService: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('ResetPasswordService', () => {

  beforeEach(() => {

    fakeUsersRepository = new FakeUsersRepository();
    fakeUsersTokenRepository = new FakeUsersTokenRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUsersTokenRepository,
      fakeHashProvider,
    );

  });


  it('should be able to reset the password', async () => {

    const user = await fakeUsersRepository.create({
      name: 'zezinho',
      email: 'zezinho@gmail.com',
      password: '123123'
    });

    const userToken = await fakeUsersTokenRepository.generate(user.id);
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPasswordService.execute({
      token: userToken.token,
      password: '888555'
    });

    const userUpdate = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('888555');

    expect(user?.password).toBe('888555');

  });

  it('should not be able to reset the password with non-existing token', async () => {

    await expect(
      resetPasswordService.execute({
        token: 'nono-exiting',
        password: 'ewewewewe'
      })
    ).rejects.toBeInstanceOf(AppError);

  });

  it('should not be able to reset the password with non-existing user', async () => {

    const { token } = await fakeUsersTokenRepository.generate(
      'nono-exiting-user'
    );

    await expect(
      resetPasswordService.execute({
        token: token,
        password: 'ewewewewe'
      })
    ).rejects.toBeInstanceOf(AppError);

  });

  it('should not be able to reset the password if passaed more 3 hours', async () => {

    const user = await fakeUsersRepository.create({
      name: 'zezinho',
      email: 'zezinho@gmail.com',
      password: '123123'
    });

    const userToken = await fakeUsersTokenRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({
        token: userToken.token,
        password: '888555'
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
