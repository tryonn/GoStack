import FakeUserRepository from '../repositories/Fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUser', () => {

  beforeEach(() => {

    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider);

  });

  it('should be able to create a new user', async () => {

    const user = await createUserService.execute({
      name: 'Zezinho Lima',
      email: 'zezinho@gmail.com',
      password: '121212'
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('zezinho@gmail.com');
  });

  it('should not be able to create a new user with same email from another', async () => {

    const user = await createUserService.execute({
      name: 'Zezinho Lima',
      email: 'zezinho@gmail.com',
      password: '121212'
    });

    await expect(
      createUserService.execute({
        name: 'Zezinho Lima',
        email: 'zezinho@gmail.com',
        password: '121212'
      }),

    ).rejects.toBeInstanceOf(AppError);
  });

});

