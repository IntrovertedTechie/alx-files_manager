import express from 'express'; 
import AppController from '../controllers/AppController'; 

const router = express.Router(); 

// Define routes
router.get('/status', AppController.getStatus); // Make sure AppController.getStatus is a valid callback function.
router.get('/stats', AppController.getStats);   // Make sure AppController.getStats is a valid callback function.

export default router;