import { Router } from 'express'
import { Express } from 'shared'

const { runAsyncWrapper, ensureRole, ensureLoggedIn } = Express

const route = Router()

export default (app: Router) => {
    app.use('/public', route)
}