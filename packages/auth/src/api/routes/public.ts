import { Router } from 'express'
import AuthService from '../../services/auth'
import { Express, Errors } from 'shared'

const { ValidationApiError } = Errors

const { runAsyncWrapper, ensureRole, ensureLoggedIn } = Express

const route = Router()

export default (app: Router) => {
  app.use('/public', route);

  // create new user
  route.post('/user', ensureRole(['admin']), runAsyncWrapper(async (req, res) => {
    try {
      await AuthService.addUser(req.body.username, req.body.password, req.body.role);
    } catch(e) {
      throw new ValidationApiError('Error! Username probably already exists')
    }
    res.send(true)
  }));

  // get list of all users
  route.get('/users', ensureRole(['admin']), runAsyncWrapper(async (req, res) => {
    res.send(await AuthService.getUsers())
  }));

  // edit user information
  route.put('/user', ensureRole(['admin']), runAsyncWrapper(async (req, res) => {
    try {
      await AuthService.editUser(req.body.id, req.body.role, req.body.password)
    } catch(e) {
      throw new ValidationApiError('Username probably already exists')
    }
    res.send(true)
  }));

  // get info about single user
  route.get('/user/:id', ensureRole(['admin']), runAsyncWrapper(async (req, res) => {
    try {
      const user = await AuthService.getUserById(req.params.id)
      res.send(user)
    } catch(e) {
      throw new ValidationApiError('User probably doesn\'t exists')
    }
  }));

  // deactivate user
  route.delete('/user/:id', ensureRole(['admin']), runAsyncWrapper(async (req, res) => {
    try {
      await AuthService.deleteUser(req.params.id)
      res.send(true)
    } catch(e) {
      throw new ValidationApiError('User probably doesn\'t exists')
    }
  }));

  // change password for current user (old password required)
  route.post('/change-password', ensureLoggedIn, runAsyncWrapper(async (req, res) => {

    const result = await AuthService.changePassword(res.locals.user._id, req.body.oldPassword, req.body.newPassword);
    if (!result) {
      throw new ValidationApiError('Passwords do not match!')
    }

    res.send(true)
  }));

  // login
  route.post('/login', runAsyncWrapper(async (req, res) => {
    const token = await AuthService.loginUser(req.body.username, req.body.password);
    if (!token) {
      throw new ValidationApiError('Error! Credentials are invalid')
    }

    res.send(token)

    // get information about current logged-in user
    route.get('/me', ensureLoggedIn, runAsyncWrapper(async (req, res) => {
      res.send(res.locals.user)
    }))
  }));
};