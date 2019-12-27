import { Router } from 'express'
import { Express } from 'shared'
import AuthService from '../../services/auth';
import config from '../../config';

const { runAsyncWrapper, interComMiddleware } = Express

const route = Router();

export default (app: Router) => {
  app.use('/internal', route);
  route.use(interComMiddleware(config.communicationSecret))
  
  route.post('/getUser', runAsyncWrapper(async (req, res) => {
    const user = await AuthService.getUser(req.body.token)
    res.json(user)
  }));
};