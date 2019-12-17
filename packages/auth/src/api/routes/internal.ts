import { Router } from 'express'
import { interComMiddleware } from '../middlewares/auth';
import { runAsyncWrapper } from '..';
import AuthService from '../../services/auth';

const route = Router();

export default (app: Router) => {
  app.use('/internal', route);
  route.use(interComMiddleware)
  
  route.post('/getUser', runAsyncWrapper(async (req, res) => {
    const user = await AuthService.getUser(req.body.token)
    res.json(user)
  }));
};