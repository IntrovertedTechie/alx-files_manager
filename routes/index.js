import express from 'express';
const router = express.Router();
import AppController from '../controllers/AppController'; // Import the AppController object

router.get('/status', AppController.getStatus); // Access the getStatus method
router.get('/stats', AppController.getStats); // Access the getStats method

export default router;