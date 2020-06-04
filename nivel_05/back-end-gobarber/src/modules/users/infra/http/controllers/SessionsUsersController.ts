import { Request, Response } from "express";

import { container } from 'tsyringe';
import AuthenticateSessionService from '@modules/users/services/AuthenticateSessionService';

import { classToClass } from 'class-transformer';

export default class SessionsUsersController {

  public async create(request: Request, response: Response): Promise<Response> {

    const { email, password } = request.body;
    const authenticateUser = container.resolve(AuthenticateSessionService);
    const { user, token } = await authenticateUser.execute({ email, password });

    return response.json({ user: classToClass(user), token });
  }
}
