import{ Router } from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';

const router = Router();

router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);

// Add new authentication and user-related endpoints
router.post('/users', UsersController.postNew);

export default router;
