import Appointment from "../infra/typeorm/entities/Appointment";
import ICreateAppointmentsDTO from "../dtos/ICreateAppointmentsDTO";
import IFindAllInMonthFromProviderDTO from "../dtos/IFindAllInMonthFromProviderDTO";
import IFindAllInDayFromProviderDTO from "../dtos/IFindAllInDayFromProviderDTO";

interface IAppointmentsRepository {

  create(data: ICreateAppointmentsDTO): Promise<Appointment>;

  findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>;

  findAllInMonthFromProvider(data: IFindAllInMonthFromProviderDTO, ): Promise<Appointment[]>;

  findAllInDayFromProvider(data: IFindAllInDayFromProviderDTO, ): Promise<Appointment[]>;
}

export default IAppointmentsRepository;
