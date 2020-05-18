import FakeStorageProvider from "@shared/container/providers/StorageProvider/Fakes/FakeStorageProvider";
import FakeUserRepository from '../repositories/Fakes/FakeUsersRepository';
import UpdateUserAvatarService from "./UpdateUserAvatarService";
import AppError from "@shared/errors/AppError";



let fakeUserRepository: FakeUserRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;


describe('UpdateUserAvatar', () => {

  beforeEach(() => {

    fakeUserRepository = new FakeUserRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateUserAvatar = new UpdateUserAvatarService(fakeUserRepository, fakeStorageProvider);

  });

  it('should be able to update user avatar', async () => {

    const user = await fakeUserRepository.create({
      name: 'joaozinho',
      email: 'joao@gmail.com',
      password: 'wewewe'
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update user avatar from nono existing user', async () => {

    await expect(
      updateUserAvatar.execute({
        user_id: 'non-existing-user',
        avatarFilename: 'avatar.jpg',
      })
    ).rejects.toBeInstanceOf(AppError);
  });



  it('should delete old avatar when updating new one', async () => {

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUserRepository.create({
      name: 'joaozinho',
      email: 'joao@gmail.com',
      password: 'wewewe'
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');

    expect(user.avatar).toBe('avatar2.jpg');
  });


});
