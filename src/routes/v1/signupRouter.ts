import { signupHandler, deleteAccountHandler } from '../../../src/controllers/signupController'
import express from 'express';

const signupRouter = express.Router();

signupRouter.post('/', signupHandler);
signupRouter.delete('/delete', deleteAccountHandler);

export default signupRouter;