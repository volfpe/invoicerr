import { Router } from 'express'
import { Express } from 'shared'
import { ensureLoggedIn } from 'shared/build/express'

const { runAsyncWrapper, ensureRole } = Express

const route = Router()

export default (app: Router) => {
    app.use('/public', route)

    route.get('/hello', ensureRole(['admin']), runAsyncWrapper(async (req, res) => {
        res.send('hello')
    }))
}