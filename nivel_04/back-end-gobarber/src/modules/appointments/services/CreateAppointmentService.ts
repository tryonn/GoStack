import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppError from '../errors/AppError';

import { getCustomRepository } from 'typeorm';

import { startOfHour } from 'date-fns';

interface Request {
  provider_id: string;
  date: Date
}

class CreateAppointmentService {

  public async execute({date, provider_id}: Request): Promise<Appointment> {

    const appointmentDate = startOfHour(date);
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate){
      throw new AppError('This appointment is already booked');
    }

    const appointment = appointmentsRepository.create( {provider_id, date:appointmentDate} );

    await appointmentsRepository.save(appointment);

    return appointment;
  }

}

export default CreateAppointmentService;
