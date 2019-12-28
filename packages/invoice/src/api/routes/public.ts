import { Router } from 'express'
import { Express } from 'shared'
import InvoiceService from '../../services/invoice'

const { runAsyncWrapper, ensureRole, ensureLoggedIn } = Express

const route = Router()

export default (app: Router) => {
    app.use('/public', route)

    route.post('/invoice', ensureRole(['admin']), runAsyncWrapper(async (req, res) => {
        return res.send(await InvoiceService.createInvoice(req.body.items, req.body.buyerId))
    }))

    route.get('/invoices', ensureLoggedIn, runAsyncWrapper(async (req, res) => {
        return res.send(await InvoiceService.getInvoices())
    }))

    route.get('/invoice/:invoiceId', ensureLoggedIn, runAsyncWrapper(async (req, res) => {
        return res.send(await InvoiceService.getInvoice(req.params.invoiceId))
    }))

    route.put('/invoice/:invoiceId', ensureRole(['admin']), runAsyncWrapper(async (req, res) => {
        return res.send( await InvoiceService.editInvoice(req.params.invoiceId, req.body.items, req.body.buyerId))
    }))
}