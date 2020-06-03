import FakeAppointmentsRepository from '../repositories/fakes/FakeAppoimentsRepository';
import CreateAppointmentServices from './CreateAppointmentService';

import AppError from '@shared/errors/AppError';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeRedisCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeRedisCacheProvider';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmentServices: CreateAppointmentServices;
let fakeNotificationRepository: FakeNotificationsRepository;
let fakeRedisCacheProvider: FakeRedisCacheProvider;

describe('CreateAppointment', () => {

  beforeEach(() => {

    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationRepository = new FakeNotificationsRepository();
    fakeRedisCacheProvider = new FakeRedisCacheProvider();
    createAppointmentServices = new CreateAppointmentServices(fakeAppointmentsRepository, fakeNotificationRepository, fakeRedisCacheProvider);

  });


  it('should be able to create a new appoinment', async () => {

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppointmentServices.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: '121212',
      provider_id: '123123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123123');
  });


  it('should not be able to create two appoinments on same time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointmentServices.execute({
      date: appointmentDate,
      user_id: 'user-id',
      provider_id: 'provider-id',
    });

    await expect(
      createAppointmentServices.execute({
        date: appointmentDate,
        user_id: 'user-id',
        provider_id: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);

  });

  it('should not be able to create an appointment on a past date', async () => {

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointmentServices.execute({
        date: new Date(2020, 4, 10, 11),
        user_id: '121212',
        provider_id: '212121'
      }),
    ).rejects.toBeInstanceOf(AppError);
  });


  it('should not be able to create an appointment with same useras provider', async () => {

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointmentServices.execute({
        date: new Date(2020, 4, 10, 13),
        user_id: 'user-id',
        provider_id: 'user-id'
      }),
    ).rejects.toBeInstanceOf(AppError);
  });


  it('should not be able to create an appointment before 8am and after 5pm', async () => {

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointmentServices.execute({
        date: new Date(2020, 4, 11, 7),
        user_id: 'user-id',
        provider_id: 'provider-id'
      }),
    ).rejects.toBeInstanceOf(AppError);


    await expect(
      createAppointmentServices.execute({
        date: new Date(2020, 4, 11, 18),
        user_id: 'user-id',
        provider_id: 'provider-id'
      }),
    ).rejects.toBeInstanceOf(AppError);

  });

});

