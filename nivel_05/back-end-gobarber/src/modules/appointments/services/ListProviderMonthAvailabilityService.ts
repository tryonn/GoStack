import "reflect-metadata"
import { injectable, inject } from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import { getDaysInMonth, getDate, isAfter } from "date-fns";

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {

  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) { }


  public async execute({ provider_id, month, year }: IRequest): Promise<IResponse> {

    const appointmens = await this.appointmentsRepository.findAllInMonthFromProvider({
      provider_id, month, year
    });


    const numberOfDayInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from(
      {
        length: numberOfDayInMonth
      },
      (_, index) => index + 1,
    );

    const availability = eachDayArray.map(day => {
      const compareDate = new Date(year, month - 1, day, 23, 59, 59);

      const appoimentsInDay = appointmens.filter(appoinment => {

        return getDate(appoinment.date) === day;
      });

      return {
        day,
        available: isAfter(compareDate, new Date()) && appoimentsInDay.length < 10,
      };
    });

    return availability;
  }

}

export default ListProviderMonthAvailabilityService;
