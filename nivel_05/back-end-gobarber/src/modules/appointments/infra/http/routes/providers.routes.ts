import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ProviderController from '../controllers/ProvidersController';

import ProviderMonthController from '../controllers/ProviderMonthAvailableController';
import ProviderDayController from '../controllers/ProviderDayAvailableController';

const providersRouter = Router();
const providerController = new ProviderController();

const providerMonthController = new ProviderMonthController();
const providerDayController = new ProviderDayController();
providersRouter.use(ensureAuthenticated);

providersRouter.get('/me', providerController.index);

providersRouter.get('/:provider_id/month-availability', celebrate({
  [Segments.PARAMS]: {
    provider_id: Joi.string().uuid().required,
  },
}), providerMonthController.index);
providersRouter.get('/:provider_id/day-availability', celebrate({
  [Segments.PARAMS]: {
    provider_id: Joi.string().uuid().required,
  },
}), providerDayController.index);

export default providersRouter;
