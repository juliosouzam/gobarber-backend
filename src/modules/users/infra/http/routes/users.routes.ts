import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import EnsureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import UserController from '../controllers/UserController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const upload = multer(uploadConfig);

// SoC: Separation of Concerns
// Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta

usersRouter.post('/', UserController.store);

usersRouter.patch(
  '/avatar',
  EnsureAuthenticated,
  upload.single('avatar'),
  UserAvatarController.update,
);

export default usersRouter;
