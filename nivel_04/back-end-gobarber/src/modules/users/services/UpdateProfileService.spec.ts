import FakeUserRepository from '../repositories/Fakes/FakeUsersRepository';
import AuthenticateSessionService from './AuthenticateSessionService';
import CreateUserService from '../services/CreateUserService';

import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;

let updateProfileService: UpdateProfileService;

describe('UpdateProfileService', () => {

  beforeEach(() => {

    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileService = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );

  });

  it('should be able update the profile', async () => {

    const user = await fakeUserRepository.create({
      name: 'jhonn doe',
      email: 's@gmail.com',
      password: '123456'
    });

    const updateUserProfile = await updateProfileService.execute({
      user_id: user.id,
      name: 'Jhon Tre',
      email: 'ee@gmail.com'
    });

    expect(updateUserProfile.name).toBe('Jhon Tre');
    expect(updateUserProfile.email).toBe('ee@gmail.com');

  });


  it('should not be able to change to another user email', async () => {

    await fakeUserRepository.create({
      name: 'jhonn doe',
      email: 's@gmail.com',
      password: '123456'
    });

    const user = await fakeUserRepository.create({
      name: 'Teste',
      email: 'teste@gmail.com',
      password: '123456'
    });

    await expect(

      updateProfileService.execute({
        user_id: user.id,
        name: 'jhonn doe',
        email: 's@gmail.com'
      }),
    ).rejects.toBeInstanceOf(AppError);

  });


  it('should be able update the password', async () => {

    const user = await fakeUserRepository.create({
      name: 'jhonn doe',
      email: 's@gmail.com',
      password: '123456'
    });

    const updateUserProfile = await updateProfileService.execute({
      user_id: user.id,
      name: 'Jhon Tre',
      email: 'ee@gmail.com',
      old_password: '123456',
      password: '888888'
    });

    expect(updateUserProfile.password).toBe('888888');

  });


  it('should not be able to update the password without old password', async () => {

    const user = await fakeUserRepository.create({
      name: 'jhonn doe',
      email: 's@gmail.com',
      password: '363636'
    });


    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'jhonn ASW doe',
        email: 'sqwe@gmail.com',
        password: '123456'
      }),

    ).rejects.toBeInstanceOf(AppError);

  });


  it('should not be able to update the password without wrong old password', async () => {

    const user = await fakeUserRepository.create({
      name: 'jhonn doe',
      email: 's@gmail.com',
      password: '123456'
    });


    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Jhon Tre',
        email: 'ee@gmail.com',
        password: '123456',
        old_password: 'wrong-old-password'
      }),
    ).rejects.toBeInstanceOf(AppError);

  });


  it('should not be able update the profile from non-existing user', async () => {

    await expect(
      updateProfileService.execute({
        user_id: 'non-existing',
        name: 'Jhon Tre',
        email: 'ee@gmail.com',
        password: '123456',
        old_password: 'wrong-old-password'
      }),
    ).rejects.toBeInstanceOf(AppError);

  });

});

