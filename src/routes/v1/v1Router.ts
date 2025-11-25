import userRouter from './userRouter'
import projectRouter from './projectRouter'
import taskRouter from './taskRouter'
import signupRouter from './signupRouter'
import loginRouter from './loginRouter'
import express from 'express';

const v1Router = express.Router();

v1Router.use('/user', userRouter);
v1Router.use('/project', projectRouter);
v1Router.use('/task', taskRouter);
v1Router.use('/signup', signupRouter);
v1Router.use('/login', loginRouter);

export default v1Router;