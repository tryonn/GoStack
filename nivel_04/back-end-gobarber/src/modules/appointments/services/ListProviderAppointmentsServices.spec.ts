import FakeAppointmentsRepository from '../repositories/fakes/FakeAppoimentsRepository';
import ListProviderAppointmentsServices from './ListProviderAppointmentsServices';
import FakeRedisCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeRedisCacheProvider';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointmentService: ListProviderAppointmentsServices;
let fakeRedisCacheProvider: FakeRedisCacheProvider;

describe('ListProviderAppointmentsServices', () => {

  beforeEach(() => {

    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeRedisCacheProvider = new FakeRedisCacheProvider();
    listProviderAppointmentService = new ListProviderAppointmentsServices(fakeAppointmentsRepository, fakeRedisCacheProvider);

  });


  it('should be able to list the appointments on a specific day', async () => {

    const app1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });


    const app2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    const appointmentsList = await listProviderAppointmentService.execute({
      provider_id: 'provider',
      year: 2020,
      month: 5,
      day: 20,
    });


    expect(appointmentsList).toEqual([app1, app2]);
  });
});

