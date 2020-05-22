import FakeAppointmentsRepository from '../repositories/fakes/FakeAppoimentsRepository';
import CreateAppointmentServices from './CreateAppointmentService';

import AppError from '@shared/errors/AppError';


describe('CreateAppointment', () => {

  it('should be able to create a new appoinment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentServices = new CreateAppointmentServices(fakeAppointmentsRepository);

    const appointment = await createAppointmentServices.execute({
      date: new Date(),
      user_id: '121212',
      provider_id: '123123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123123');
  });


  it('should not be able to create two appoinments on same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentServices = new CreateAppointmentServices(fakeAppointmentsRepository);

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointmentServices.execute({
      date: appointmentDate,
      user_id: '121212',
      provider_id: '1231231213',
    });

    expect(
      createAppointmentServices.execute({
        date: appointmentDate,
        user_id: '121212',
        provider_id: '123123123',
      }),
    ).rejects.toBeInstanceOf(AppError);

  });

});

