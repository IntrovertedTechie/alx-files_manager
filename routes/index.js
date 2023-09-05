
 { Router } from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController'; // Import the AuthController

const router = Router();

router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);

// Add new authentication and user-related endpoints
router.post('/users', UsersController.postNew);
router.get('/users/me', UsersController.getMe);
router.get('/connect', AuthController.getConnect);
router.get('/disconnect', AuthController.getDisconnect);

export default router;
