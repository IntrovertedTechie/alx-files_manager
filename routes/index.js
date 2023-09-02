const express = require('express');
const router = express.Router();
import AppController = require('../controllers/AppController');

router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);

module.exports = router;
