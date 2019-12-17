import { Router, Request, Response, NextFunction } from 'express'
import AuthService from '../../services/auth'
import { ValidationApiError } from '../../types/errors';
import { runAsyncWrapper } from '..';
import { ensureRole } from '../middlewares/auth';

const route = Router();

export default (app: Router) => {
  app.use('/public', route);

  route.post('/addUser', ensureRole(['admin']), runAsyncWrapper(async (req, res) => {
    try {
      await AuthService.addUser(req.body.username, req.body.password, req.body.role);
    } catch(e) {
      throw new ValidationApiError('Error! Username probably already exists')
    }
    res.send(true)
  }));

  route.post('/changePassword', runAsyncWrapper(async (req, res) => {
    try {
      await AuthService.changePassword(req.body.username, req.body.password, req.body.role);
    } catch(e) {
      throw new ValidationApiError('Error! Username probably already exists')
    }
    res.send(true)
  }));

  route.post('/login', runAsyncWrapper(async (req, res) => {
    const token = await AuthService.loginUser(req.body.username, req.body.password);
    if (!token) {
      throw new ValidationApiError('Error! Credentials are invalid')
    }

    res.send(token)
  }));
};