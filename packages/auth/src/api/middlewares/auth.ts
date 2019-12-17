import express from 'express'
import authService from '../../services/auth'

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
