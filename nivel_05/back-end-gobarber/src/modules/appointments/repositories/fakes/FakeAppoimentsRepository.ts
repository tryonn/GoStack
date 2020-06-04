import { uuid } from 'uuidv4';
import { isEqual, getMonth, getYear } from 'date-fns';
import Appointment from "../../infra/typeorm/entities/Appointment";
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentsDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';

class FakeAppoimentsRepository implements IAppointmentsRepository {

  private appointments: Appointment[] = [];

  public async create({ provider_id, user_id, date }: ICreateAppointmentsDTO): Promise<Appointment> {

    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), user_id, date, provider_id })

    /*
    appointment.id = uuid();
    appointment.provider_id = provider_id;
    appointment.date = date;
    */
    this.appointments.push(appointment);


    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      appointment => isEqual(appointment.date, date),
    );
    return findAppointment;
  }

  public async findAllInMonthFromProvider({ provider_id, month, year }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {

    const appointments = this.appointments.filter(
      appointment => appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointments;
  }


  public async findAllInDayFromProvider({ provider_id, day, month, year }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {

    const appointments = this.appointments.filter(
      appointment => appointment.provider_id === provider_id &&
        getMonth(appointment.date) === day &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointments;
  }

}

export default FakeAppoimentsRepository;
