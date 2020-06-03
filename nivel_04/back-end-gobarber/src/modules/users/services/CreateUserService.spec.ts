import FakeUserRepository from '../repositories/Fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeRedisCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeRedisCacheProvider';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let fakeRedisCacheProvider: FakeRedisCacheProvider;

describe('CreateUser', () => {

  beforeEach(() => {

    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeRedisCacheProvider = new FakeRedisCacheProvider();

    createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider, fakeRedisCacheProvider);

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

