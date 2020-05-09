import { Request, Response } from "express";

import { container } from 'tsyringe';
import AuthenticateSessionService from '@modules/users/services/AuthenticateSessionService';

export default class SessionsUsersController {

  public async create(request: Request, response: Response): Promise<Response> {

    const { email, password } = request.body;
    const authenticateUser = container.resolve(AuthenticateSessionService);
    const { user, token } = await authenticateUser.execute({ email, password });
    delete user.password;
    //return response.json({ user, token });

    return response;

  }
}
