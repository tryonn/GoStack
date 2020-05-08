import Appointment from "../infra/typeorm/entities/Appointment";


interface IAppointmentsRepository {
  findByData(data: Date): Promise<Appointment | undefined>
}

export default IAppointmentsRepository;
