import { loginHandler, loginCheckHandler ,logoutHandler} from '../../../src/controllers/loginController'
import express from 'express';

const loginRouter = express.Router();

loginRouter.post('/', loginHandler);
loginRouter.get('/', loginCheckHandler);
loginRouter.delete('/', logoutHandler);

export default loginRouter;