const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Import your routes module
const routes = require('./routes/index');
// Use the routes middleware
app.use('/', routes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
