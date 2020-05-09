import { Router, request, response } from "express";

import AuthenticateSessionService from '@modules/users/services/AuthenticateSessionService';
import UsersRepository from "../../typeorm/repositories/UserRepository";

const sessionsRouter = Router();


sessionsRouter.post('/', async (request, response) => {

  const userRepository = new UsersRepository;
  const { email, password } = request.body;



  const authenticateUser = new AuthenticateSessionService(userRepository);

  const { user, token } = await authenticateUser.execute({ email, password });

  delete user.password;

  return response.json({ user, token });
});

export default sessionsRouter;
