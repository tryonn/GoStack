import FakeAppointmentsRepository from '../repositories/fakes/FakesAppoimentsRepository';
import CreateAppointmentServices from './CreateAppointmentService';


describe('CreateAppointment', () => {

  it('should be able to create a new appoinment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentServices = new CreateAppointmentServices(fakeAppointmentsRepository);

    const appointment = await createAppointmentServices.execute({
      date: new Date(),
      provider_id: '123123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123123');




  });

});

