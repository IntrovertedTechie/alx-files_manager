import express from 'express';
const router = express.Router();
import { getStatus, getStats } from '../controllers/AppController'; // Import specific functions

router.get('/status', getStatus); // Use the imported functions directly
router.get('/stats', getStats);

export default router;
