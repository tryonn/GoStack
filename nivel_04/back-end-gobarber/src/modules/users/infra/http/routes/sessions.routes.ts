import { Router } from "express";
import SessionsUsersController from "../controllers/SessionsUsersController";

const sessionsRouter = Router();
const sessionsUsersController = new SessionsUsersController();

sessionsRouter.post('/', sessionsUsersController.create);
export default sessionsRouter;
