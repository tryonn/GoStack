
import User from "../../infra/typeorm/entities/User";
import { uuid } from "uuidv4";
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import IUserRepository from "../IUserRepository";

class FakeUsersRepository implements IUserRepository {

  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);
    return findUser;
  }


  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);
    return findUser;
  }


  public async create(dataUser: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, { id: uuid() }, dataUser);
    this.users.push(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    const findUser = this.users.findIndex(u => u.id === user.id);

    this.users[findUser] = user;

    return user;
  }

}

export default FakeUsersRepository;
