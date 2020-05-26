import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import AppointmnesController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmnesController = new AppointmnesController();
const providerAppointmnesController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', appointmnesController.create);
appointmentsRouter.post('/ne', providerAppointmnesController.index);

export default appointmentsRouter;
