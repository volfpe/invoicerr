import { InvoiceService } from '../types'
import api from '../api'
import express from 'express'
import { Express } from 'shared'
import config from '../config'

const { authMiddleware } = Express

export default async (app: InvoiceService) => {
    app.expressApp.use(express.json())
    app.expressApp.use(authMiddleware(config.services.auth, config.communicationSecret))
    app.expressApp.use('/', api())
    return;
}