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

    let cacheKey = `provider-appointments:${provider_id}:${year}-${month}-${day}`;

    let appointments = await this.redisCacheProvider.recover<Appointment[]>(cacheKey);

    if (!appointments) {
      appointments = await this.appointmentsRepository.findAllInDayFromProvider({
        provider_id, year, month, day,
      });

      console.log('Buscou no Banco');


      await this.redisCacheProvider.save(
        cacheKey,
        appointments
      );
    }
    return appointments;
  }

}

export default ListProviderAppointmentsServices;
