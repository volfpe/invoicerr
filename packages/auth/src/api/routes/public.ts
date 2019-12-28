import { Router } from 'express'
import AuthService from '../../services/auth'
import { Express, Errors } from 'shared'

const { ValidationApiError } = Errors

const { runAsyncWrapper, ensureRole, ensureLoggedIn } = Express

const route = Router()

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

  route.post('/editUser', ensureRole(['admin']), runAsyncWrapper(async (req, res) => {
    try {
      await AuthService.editUser(req.body.id, req.body.username, req.body.role, req.body.isActive, req.body.password)
    } catch(e) {
      throw new ValidationApiError('Username probably already exists')
    }
    res.send(true)
  }));

  route.post('/changePassword', ensureLoggedIn, runAsyncWrapper(async (req, res) => {

    const result = await AuthService.changePassword(res.locals.user._id, req.body.oldPassword, req.body.newPassword);
    if (!result) {
      throw new ValidationApiError('Passwords do not match!')
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