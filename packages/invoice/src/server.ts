import express from 'express'
import config from './config'
import loaders from './loaders'
import { InvoiceService } from './types'

const server = async () => {
    const app = express()
    const port = config.port

    const invoiceService: InvoiceService = {
        expressApp: app
    }

    // load everything we need to run the app
    await loaders(invoiceService);
    
    app.listen(port, () => console.log(`Invoice service listening on port ${port}!`))
}

server()