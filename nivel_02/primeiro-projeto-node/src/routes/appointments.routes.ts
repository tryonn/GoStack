import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';


const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();


appointmentsRouter.get('/', (reques, response) => {
  let appointments = appointmentsRepository.all();
  return response.json(appointments);
});


appointmentsRouter.post('/', (request, response) => {
  try {

    const { provider, date } = request.body;
    const parseDate = parseISO(date);
    const createAppointmentService = new CreateAppointmentService(appointmentsRepository);
    const appointment = createAppointmentService.execute({date: parseDate, provider});

    return response.json(appointment);

  } catch (e) {
    return response.status(400).json( { error: e.message} );
  }

});

export default appointmentsRouter;
