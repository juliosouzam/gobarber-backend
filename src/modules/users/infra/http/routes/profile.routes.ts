import { Router } from 'express';

import EnsureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProfileController from '../controllers/ProfileController';

const profileRoutes = Router();

profileRoutes.use(EnsureAuthenticated);

profileRoutes.get('/', ProfileController.show);
profileRoutes.put('/', ProfileController.update);

export default profileRoutes;
