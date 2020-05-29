import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import EnsureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import AppointmentController from '../controllers/AppointmentController';
import ProviderAppointmentController from '../controllers/ProviderAppointmentController';

const appointmentsRouter = Router();

// SoC: Separation of Concerns
// Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta

appointmentsRouter.use(EnsureAuthenticated);

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date().required(),
    },
  }),
  AppointmentController.store,
);

appointmentsRouter.get('/me', ProviderAppointmentController.index);

export default appointmentsRouter;
