import express from 'express';
import router from './routes/index';

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
const app = express();

app.use(express.json());
app.use('/', router);

// Catch-all error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Listening on server port ${port}`);
});
