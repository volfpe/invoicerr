import express from 'express'
import { ValidationApiError } from './errors'
import axios from 'axios'

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

export const authMiddleware: (authUrl: string, secret: string) => express.RequestHandler = (authUrl, secret) => runAsyncWrapper(async (req, res, next) => {
    // get jwt token from header
    const authHeader = req.headers.authorization
    if (!authHeader) {
        next()
        return
    }

    const user = await axios.post(authUrl + '/internal/getUser', {
		token: authHeader
	}, {
        headers: {
			authorization: secret
		},
    })
    if (user.data) {
        res.locals.user = user.data
    }
    next()
    return
})

export const interComMiddleware: (secret: string) => express.RequestHandler = (secret) => async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (authHeader === secret) {
        next()
        return
    }
    res.status(401).send('Invalid credentials')
    return
}

export const ensureRole: (roles: string[]) => express.RequestHandler = (roles) => async (req, res, next) => {

    const user = res.locals.user
    if (!user) {
        res.status(401).send('Invalid credentials')
        return
    }

    // check role
    if (roles.includes(user.role)) {
        next()
        return
    }

    res.status(403).send('Insufficient permissions')
    return
}

export const ensureLoggedIn: express.RequestHandler = async (req, res, next) => {
    const user = res.locals.user
    if (!user) {
        res.status(401).send('Please log in')
        return
    }

    next()
    return
}
