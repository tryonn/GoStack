import { Router, request, response } from "express";

import AuthenticateSessionService from '../services/AuthenticateSessionService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    const { email, password} = request.body;

    const authenticateUser = new AuthenticateSessionService();

    const { user, token } = await authenticateUser.execute({ email, password });

    delete user.password;

    return response.json({ user, token });
});

export default sessionsRouter;
