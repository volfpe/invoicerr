import { AuthService } from '../types'
import api from '../api'
import express from 'express'
import { authMiddleware } from '../api/middlewares/auth';

export default async (app: AuthService) => {
    app.expressApp.use(express.json())
    app.expressApp.use(authMiddleware)
    app.expressApp.use('/', api())
    return;
}