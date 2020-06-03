//import "reflect-metadata";
import { injectable, inject } from 'tsyringe';
import User from "@modules/users/infra/typeorm/entities/User";
import IUserRepository from "@modules/users/repositories/IUserRepository";
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";

interface IRequest {
  user_id: string;
}

@injectable()
class ListProviderServices {

  constructor(

    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('RedisCacheProvider')
    private redisCacheProvider: ICacheProvider,
  ) { }


  public async execute({ user_id }: IRequest): Promise<User[]> {

    let users = await this.redisCacheProvider.recover<User[]>(`providers-list:${user_id}`);

    if (!users) {
      users = await this.usersRepository.findAllProviders({
        except_user_id: user_id,
      });
      console.log('A query no banco foi feita..');

      await this.redisCacheProvider.save(`providers-list:${user_id}`, users);
    }
    return users;
  }

}

export default ListProviderServices;
