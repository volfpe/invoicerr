import { Router, Request, Response, NextFunction } from 'express'
import AuthService from '../../services/auth'

const route = Router();

export default (app: Router) => {
  app.use('/internal', route);

  route.get('/', (req, res) => res.send('Hello from internal'));
};