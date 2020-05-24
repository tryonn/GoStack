import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ProviderController from '../controllers/ProvidersController';

import ProviderMonthController from '../controllers/ProviderMonthAvailableController';
import ProviderDayController from '../controllers/ProviderDayAvailableController';

const providersRouter = Router();
const providerController = new ProviderController();

const providerMonthController = new ProviderMonthController();
const providerDayController = new ProviderDayController();
providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providerController.index);

providersRouter.get('/:id/month-availability', providerMonthController.index);
providersRouter.get('/:id/day-availability', providerDayController.index);

export default providersRouter;
