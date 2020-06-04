import FakeUserRepository from '../repositories/Fakes/FakeUsersRepository';
import AuthenticateSessionService from './AuthenticateSessionService';
import CreateUserService from '../services/CreateUserService';

import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeRedisCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeRedisCacheProvider';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;

let authService: AuthenticateSessionService;
let createUserService: CreateUserService;
let fakeRedisCacheProvider: FakeRedisCacheProvider;

describe('AuthenticateSessionService', () => {

  beforeEach(() => {

    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeRedisCacheProvider = new FakeRedisCacheProvider();

    authService = new AuthenticateSessionService(fakeUserRepository, fakeHashProvider);
    createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider, fakeRedisCacheProvider);

  });

  it('should be able to authenticate', async () => {

    const user = await createUserService.execute({
      name: 'Zezinho Lima',
      email: 'zezinho@gmail.com',
      password: '121212'
    });

    const response = await authService.execute({
      email: 'zezinho@gmail.com',
      password: '121212'
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);

  });

  it('should not be able to authenticate with non existing user', async () => {

    await createUserService.execute({
      name: 'Zezinho Lima',
      email: 'zezinho@gmail.com',
      password: '121212'
    });

    expect(authService.execute({
      email: 'zezin1ho@gmail.com',
      password: '1211212'
    }),
    ).rejects.toBeInstanceOf(AppError);

  });

  it('should not be able to authenticate with wrong password', async () => {

    await createUserService.execute({
      name: 'Zezinho Lima',
      email: 'zezinho@gmail.com',
      password: '121212'
    });

    await expect(
      authService.execute({
        email: 'zezinho@gmail.com',
        password: '222222'
      }),
    ).rejects.toBeInstanceOf(AppError);

  });

});

