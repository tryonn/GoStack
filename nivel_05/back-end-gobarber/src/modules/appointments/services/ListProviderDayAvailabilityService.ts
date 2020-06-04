import "reflect-metadata"
import { injectable, inject } from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import { getHours, isAfter } from "date-fns";

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

    const currentDate = new Date(Date.now());

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointmens.find(appointment =>
        getHours(appointment.date) === hour,
      );

      const compareDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        available: !hasAppointmentInHour && isAfter(compareDate, currentDate),
      }
    });

    return availability;
  }

}

export default ListProviderDayAvailabilityService;
