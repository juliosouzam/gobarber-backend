import { Router } from 'express';
import EnsureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProviderController from '../controllers/ProviderController';

const providersRouter = Router();

// SoC: Separation of Concerns
// Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta

providersRouter.use(EnsureAuthenticated);

// providersRouter.get('/', async (request, response) => {
//   const appointmentsRepository = getCustomRepository(AppointmentsRepository);
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

providersRouter.get('/', ProviderController.index);

export default providersRouter;
