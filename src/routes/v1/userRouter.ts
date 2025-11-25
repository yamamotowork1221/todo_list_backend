import {
  getUserProfileByIdHandler
} from '../../../src/controllers/userController'
import express from 'express';

const userRouter = express.Router();

userRouter.get('/profile', getUserProfileByIdHandler);

export default userRouter;