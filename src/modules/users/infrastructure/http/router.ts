
import express from 'express';
import { createUserController } from './controllers/CreateUserController';

const userRouter = express.Router();

userRouter.post('/',
  (req, res) => createUserController.execute(req, res)
)

export { userRouter };