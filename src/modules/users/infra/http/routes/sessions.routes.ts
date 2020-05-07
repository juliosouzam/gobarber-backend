import { Router } from 'express';

import SessionController from '../controllers/SessionController';

const sessionsRouter = Router();

// SoC: Separation of Concerns
// Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta

sessionsRouter.post('/', SessionController.store);

export default sessionsRouter;
