import { Router } from 'express';
import EnsureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import AppointmentController from '../controllers/AppointmentController';

const appointmentsRouter = Router();

// SoC: Separation of Concerns
// Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta

appointmentsRouter.use(EnsureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//   const appointmentsRepository = getCustomRepository(AppointmentsRepository);
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentsRouter.post('/', AppointmentController.store);

export default appointmentsRouter;
