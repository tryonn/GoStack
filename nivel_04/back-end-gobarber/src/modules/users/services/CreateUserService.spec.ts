import FakeUserRepository from '../repositories/Fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';

import AppError from '@shared/errors/AppError';


describe('CreateUser', () => {

  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const createUserService = new CreateUserService(fakeUserRepository);

    const user = await createUserService.execute({
      name: 'Zezinho Lima',
      email: 'zezinho@gmail.com',
      password: '121212'
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('zezinho@gmail.com');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const createUserService = new CreateUserService(fakeUserRepository);

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

