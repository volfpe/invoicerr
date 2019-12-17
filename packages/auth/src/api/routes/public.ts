import { Router, Request, Response, NextFunction } from 'express'
import AuthService from '../../services/auth'
import { ValidationApiError } from '../../types/errors';
import { runAsyncWrapper } from '..';
import { ensureRole } from '../middlewares/auth';

const route = Router();

export default (app: Router) => {
  app.use('/public', route);

  // TODO only role admin
  route.post('/addUser', ensureRole(['admin']), runAsyncWrapper(async (req, res, next) => {
    try {
      await AuthService.addUser(req.body.username, req.body.password, req.body.role);
    } catch(e) {
      throw new ValidationApiError('Error! Username probably already exists')
    }
    res.send(true)
  }));

  route.get('/login', runAsyncWrapper(async (req, res, next) => {

    const token = await AuthService.loginUser('volfpea', 'bb');
    if (!token) {
      throw new ValidationApiError('Error! Credentials are invalid')
    }

    res.send(token)
  }));

  route.get(
    '/signup',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        // const { user, token } = await AuthService.SignUp(req.body as IUserInputDTO);
        // return res.status(201).json({ user, token });
        return res.json({ user: 'volfpe', token: 'ąaa' })
      } catch (e) {
        return next(e);
      }
    },
  );
};