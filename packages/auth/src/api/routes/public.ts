import { Router, Request, Response, NextFunction } from 'express'
import AuthService from '../../services/auth'
import { ValidationApiError } from '../../types/errors';
import { runAsyncWrapper } from '..';

const route = Router();

export default (app: Router) => {
  app.use('/public', route);

  route.get('/', runAsyncWrapper(async (req, res, next) => {
    try {
      await AuthService.addUser('aba', 'bb', 'user');
    } catch(e) {
      throw new ValidationApiError('Error! Username probably already exists')
    }
    res.send('Hello')
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