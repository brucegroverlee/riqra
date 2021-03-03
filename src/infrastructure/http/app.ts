
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { v1Router } from './api/v1';
import { isProduction } from '../../config';

const app = express();

const origin = {
  origin: isProduction ? 'https://whitelabel.com' : '*',
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(origin));
app.use(compression());
app.use(helmet());

// don"t show the log when it is test
if (process.env.NODE_ENV !== "test" && process.env.NODE_ENV !== "test.local") {
  // use morgan to log at command line
  app.use(morgan("combined")); // "combined" outputs the Apache style LOGs
}

app.use('/api/v1', v1Router)

// New api versions can go here

if (process.env.NODE_ENV !== "test" && process.env.NODE_ENV !== "test.local") {
  app.listen(process.env.PORT || 9044, () => {
    console.log(`[App]: Server listening on 9044`)
  })
}

export { app };