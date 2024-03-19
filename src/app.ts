import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import taskRoute from './routes/taskRoute';
import bodyParser from 'body-parser';
import { errorHandler } from './middleware/errorHandler';

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());

app.use(taskRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
