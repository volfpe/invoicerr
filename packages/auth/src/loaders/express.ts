import express from 'express'
import config from '../config'
import { AuthService } from '../types'
import api from '../api'

export default async (app: AuthService) => {
    app.expressApp.use('/', api())
    return;
}