import "reflect-metadata"
import { injectable, inject } from 'tsyringe';
import IUserRepository from "@modules/users/repositories/IUserRepository";
import User from "@modules/users/infra/typeorm/entities/User";
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import { getHours } from "date-fns";

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {

  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) { }


  public async execute({ provider_id,
    month,
    year,
    day, }: IRequest): Promise<IResponse> {

    const appointmens = await this.appointmentsRepository.findAllInDayFromProvider({
      provider_id,
      month,
      year,
      day,
    });


    const hourStart = 8;

    const eachHourArray = Array.from(
      {
        length: 10
      },
      (_, index) => index + hourStart,
    );

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointmens.find(appointment =>
        getHours(appointment.date) === hour,
      );

      return {
        hour,
        available: !hasAppointmentInHour,
      }
    });

    return availability;
  }

}

export default ListProviderDayAvailabilityService;
