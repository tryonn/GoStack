import { inject, injectable } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';


interface IRequest {
  provider_id: string;
  year: number;
  month: number;
  day: number;
}

@injectable()
class ListProviderAppointmentsServices {

  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('RedisCacheProvider')
    private redisCacheProvider: ICacheProvider,
  ) { }

  public async execute({ provider_id, year, month, day }: IRequest): Promise<Appointment[]> {

    const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
      provider_id, year, month, day,
    });

    await this.redisCacheProvider.save('ads', 'ads');

    return appointments;
  }

}

export default ListProviderAppointmentsServices;
