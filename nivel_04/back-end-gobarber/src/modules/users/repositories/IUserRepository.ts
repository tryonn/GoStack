import User from '@modules/users/infra/typeorm/entities/User';
import ICreateAppointmentsDTO from '../dtos/ICreateUserDTO';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUserRepository {
  findById(id: string): Promise<User | undefined>;

  findByEmail(email: string): Promise<User | undefined>;

  create(data: ICreateUserDTO): Promise<User>;

  save(user: User): Promise<User>;
};
