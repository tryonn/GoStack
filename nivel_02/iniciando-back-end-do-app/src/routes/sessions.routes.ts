import { Router, request, response } from "express";

import AuthenticateSessionService from '../services/AuthenticateSessionService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {

    const { email, password} = request.body;

    const authenticateUser = new AuthenticateSessionService();

    const { user } = await authenticateUser.execute({ email, password });

    delete user.password;

    return response.json({ user });

  } catch (e) {

    return response.status(400).json({ error: e.message });

  }
});

export default sessionsRouter;
