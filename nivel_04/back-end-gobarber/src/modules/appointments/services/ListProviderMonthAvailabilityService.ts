import "reflect-metadata"
import { injectable, inject } from 'tsyringe';
import IUserRepository from "@modules/users/repositories/IUserRepository";
import User from "@modules/users/infra/typeorm/entities/User";
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

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


    console.log(appointmens);


    return [{ day: 1, available: false }];
  }

}

export default ListProviderMonthAvailabilityService;
