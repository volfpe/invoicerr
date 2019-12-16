import { Router } from 'express'
import publicApi from './routes/public'
import internalApi from './routes/internal'
import express from 'express'
import { ValidationApiError } from '../types/errors'

export const runAsyncWrapper = (callback: express.RequestHandler): express.RequestHandler => {
	return function (req, res, next) {
	  callback(req, res, next).catch((e: any) => {
		if (e instanceof ValidationApiError) {
			res.status(400).send(e.message);
			return
		}
		return next(e)
	  })
	}
  }

export default () => {
	const app = Router()
	publicApi(app);
	internalApi(app);

	return app
}