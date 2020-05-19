import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ProviderController from '../controllers/ProvidersController';

const providersRouter = Router();
const providerController = new ProviderController();
providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providerController.index);

export default providersRouter;
