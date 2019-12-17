import express from 'express'
import authService from '../../services/auth'

export const ensureRole: (roles: string[]) => express.RequestHandler = (roles) => async (req, res, next) => {
    // get jwt token from header
    const authHeader = req.headers.authorization
    if (!authHeader) {
        res.status(403).send('No auth header sent')
        return
    }
    
    const user = await authService.getUser(authHeader)
    if (!user) {
        res.status(403).send('Invalid token')
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
