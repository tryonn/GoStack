import Appointment from "../infra/typeorm/entities/Appointment";
import ICreateAppointmentsDTO from "../dtos/ICreateAppointmentsDTO";

interface IAppointmentsRepository {

  create(data: ICreateAppointmentsDTO): Promise<Appointment>;

  findByDate(date: Date): Promise<Appointment | undefined>;
}

export default IAppointmentsRepository;
