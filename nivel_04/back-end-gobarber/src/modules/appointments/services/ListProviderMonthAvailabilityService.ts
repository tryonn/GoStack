import "reflect-metadata"
import { injectable, inject } from 'tsyringe';
import IUserRepository from "@modules/users/repositories/IUserRepository";
import User from "@modules/users/infra/typeorm/entities/User";
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import { getDaysInMonth, getDate } from "date-fns";

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
      const appoimentsInDay = appointmens.filter(appoinment => {
        return getDate(appoinment.date) === day;
      });
      return {
        day,
        available: appoimentsInDay.length < 10,
      };
    });

    return availability;
  }

}

export default ListProviderMonthAvailabilityService;
