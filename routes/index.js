const express = require('express');
const AppController = require('../controllers/AppController');

const app = express();

// Define a common middleware function that will be executed for all routes
app.all('*', (req, res, next) => {
  // Perform common operations or checks here
  // For example, you can add authentication logic here
  
  // Continue to the next middleware or route handler
  next();
});

// Define your routes
app.get('/status', (req, res) => {
  AppController.getStatus(req, res);
});

app.get('/stats', (req, res) => {
  AppController.getStats(req, res);
});

// Start the Express server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Express Server app running on http://localhost:${port}/`);
});
