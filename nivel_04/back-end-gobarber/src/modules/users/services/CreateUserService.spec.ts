import FakeUserRepository from '../repositories/Fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';


describe('CreateUser', () => {

  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider);

    const user = await createUserService.execute({
      name: 'Zezinho Lima',
      email: 'zezinho@gmail.com',
      password: '121212'
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('zezinho@gmail.com');
  });

  it('should not be able to create a new user with same email from another', async () => {

    const fakeHashProvider = new FakeHashProvider();
    const fakeUserRepository = new FakeUserRepository();
    const createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider);

    const user = await createUserService.execute({
      name: 'Zezinho Lima',
      email: 'zezinho@gmail.com',
      password: '121212'
    });

    expect(
      createUserService.execute({
        name: 'Zezinho Lima',
        email: 'zezinho@gmail.com',
        password: '121212'
      }),

    ).rejects.toBeInstanceOf(AppError);
  });

});

