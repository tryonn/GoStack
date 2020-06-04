import FakeUserRepository from '../repositories/Fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import ShowProfileService from './ShowProfileService';

let fakeUserRepository: FakeUserRepository;
let showProfile: ShowProfileService;

describe('ShowProfileService', () => {

  beforeEach(() => {

    fakeUserRepository = new FakeUserRepository();
    showProfile = new ShowProfileService(
      fakeUserRepository,
    );

  });

  it('should be able show the profile', async () => {

    const user = await fakeUserRepository.create({
      name: 'jhonn doe',
      email: 's@gmail.com',
      password: '123456'
    });

    const show = await showProfile.execute({
      user_id: user.id,
    });

    expect(show.name).toBe('jhonn doe');
    expect(show.email).toBe('s@gmail.com');

  });

  it('should not be able show the profile from non-existing user', async () => {

    await expect(
      showProfile.execute({
        user_id: 'non-existing',
      }),
    ).rejects.toBeInstanceOf(AppError);

  });

});

