import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import AppointmnesController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmnesController = new AppointmnesController();
appointmentsRouter.use(ensureAuthenticated);


/*
appointmentsRouter.get('/', async (reques, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
});
*/

appointmentsRouter.post('/', appointmnesController.create);

export default appointmentsRouter;
