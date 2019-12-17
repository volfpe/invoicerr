import { AuthService } from '../types'
import api from '../api'
import express from 'express'

export default async (app: AuthService) => {
    app.expressApp.use(express.json());
    app.expressApp.use('/', api())
    return;
}