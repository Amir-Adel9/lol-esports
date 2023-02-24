import express from 'express';
import path from 'path';
import router from './routes/routes';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use('/leagues', router, express.static(path.join(__dirname + '/public')));

app.all('*', function (_req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

app.use(cors());

app.listen(PORT, () =>
  console.log(`server running on: http://localhost:${PORT}`)
);

export default app;
