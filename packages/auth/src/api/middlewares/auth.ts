import express from 'express'
import authService from '../../services/auth'

// auth middleware to initialize local user object from jwt token
export const authMiddleware: express.RequestHandler = async (req, res, next) => {
    // get jwt token from header
    const authHeader = req.headers.authorization
    if (!authHeader) {
        next()
        return
    }

    const user = await authService.getUser(authHeader)
    if (user) {
        res.locals.user = user
    }
    next()
    return
}

