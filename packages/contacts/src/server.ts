import express from 'express'
import config from './config'
import loaders from './loaders'
import { AuthService } from './types'

const server = async () => {
    const app = express()
    const port = config.port

    const authService: AuthService = {
        expressApp: app
    }

    // load everything we need to run the app
    await loaders(authService);
    
    app.listen(port, () => console.log(`Contact service listening on port ${port}!`))
}

server()