import ListProviderServices from "./ListProviderServices";
import FakeUsersRepository from "@modules/users/repositories/Fakes/FakeUsersRepository";
import FakeRedisCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeRedisCacheProvider";


let listProvider: ListProviderServices;
let fakeUserRepository: FakeUsersRepository;
let fakeRedisCacheProvider: FakeRedisCacheProvider;

describe('ListProviderService', () => {

  beforeEach(() => {

    fakeUserRepository = new FakeUsersRepository();
    fakeRedisCacheProvider = new FakeRedisCacheProvider();


    listProvider = new ListProviderServices(
      fakeUserRepository,
      fakeRedisCacheProvider
    );

  });

  it('should be able to list the provider', async () => {

    const user1 = await fakeUserRepository.create({
      name: 'jhonn doe',
      email: 's@gmail.com',
      password: '123456'
    });

    const user2 = await fakeUserRepository.create({
      name: 'doe',
      email: 'ss@gmail.com',
      password: '123456'
    });

    const logger_user = await fakeUserRepository.create({
      name: 'jhonn',
      email: 's23@gmail.com',
      password: '111256'
    });

    const providers = await listProvider.execute({
      user_id: logger_user.id,
    });

    expect(providers).toEqual([user1, user2]);

  });

});

