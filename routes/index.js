import { Router } from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController'; // Import the UsersController

const router = Router();

router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);

// Add a new endpoint for creating a user
router.post('/users', UsersController.postNew);

export default router;