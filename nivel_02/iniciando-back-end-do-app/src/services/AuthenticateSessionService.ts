import { getRepository } from "typeorm";
import User from "../models/User";
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken';

interface Request {
  email: string,
  password: string
}

interface Response{
  user: User,
  token: string
}

class AuthenticateSessionService {

  public async execute({ email, password }: Request): Promise<Response>{

    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user){
      throw new Error('Incorrect email/password combination.');
    }


    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched){
      throw new Error('Incorrect email/password combination.');
    }

    const token = sign({}, '2facdccb0263a110d14a9053656c1fa4', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    }

  }
}

export default AuthenticateSessionService;
