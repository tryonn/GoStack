import FakeUserRepository from '../repositories/Fakes/FakeUserRepository';
import AuthenticateSessionService from './AuthenticateSessionService';
import CreateUserService from '../services/CreateUserService';

import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';


describe('AuthenticateSessionService', () => {

  it('should be able to authenticate', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authService = new AuthenticateSessionService(fakeUserRepository, fakeHashProvider);
    const createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider);


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

});

