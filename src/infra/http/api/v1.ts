
import express from 'express';
import { userRouter } from '../../../modules/users/infrastructure/http/router';

const v1Router = express.Router();

v1Router.use('/users', userRouter);

// All routes go here 

export { v1Router }