import express from 'express';
import router from './routes/routes';

const app = express();
const PORT = 3000;

app.use('/leagues', router);

app.get('/', (req, res) => res.send('this is a test'));

app.listen(PORT, () =>
  console.log(`server running on: http://localhost:${PORT}`)
);

export default app;
