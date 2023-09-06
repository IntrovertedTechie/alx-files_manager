import { Router } from 'express';
import AppController from '../controllers/AppController'; // Import AppController
import UsersController from '../controllers/UsersController'; // Import UsersController
import AuthController from '../controllers/AuthController'; // Import AuthController
import FilesController from '../controllers/FilesController';


const router = Router();

router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);

router.post('/users', UsersController.postNew);

// Add the new endpoints
router.get('/connect', AuthController.getConnect);
router.get('/disconnect', AuthController.getDisconnect);
router.get('/users/me', UsersController.getMe);
router.post('/files', AuthMiddleware.authenticateUser, FilesController.postUpload);

export default router;