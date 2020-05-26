import { Router } from "express";
import { celebrate, Segments, Joi } from 'celebrate';

import SessionsUsersController from "../controllers/SessionsUsersController";

const sessionsRouter = Router();
const sessionsUsersController = new SessionsUsersController();

sessionsRouter.post('/', celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }
}), sessionsUsersController.create);
export default sessionsRouter;
