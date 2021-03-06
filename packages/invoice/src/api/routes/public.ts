import { Router } from 'express'
import { Express } from 'shared'
import InvoiceService from '../../services/invoice'

const { runAsyncWrapper, ensureRole, ensureLoggedIn } = Express

const route = Router()

export default (app: Router) => {
    app.use('/public', route)

    // create new invoice
    route.post('/invoice', ensureRole(['accountant']), runAsyncWrapper(async (req, res) => {
        return res.send(await InvoiceService.createInvoice(req.body.items, req.body.buyer, req.body.seller))
    }))

    // get all invoices
    route.get('/invoices', ensureLoggedIn, runAsyncWrapper(async (req, res) => {
        return res.send(await InvoiceService.getInvoices())
    }))

    // get single invoice
    route.get('/invoice/:invoiceId', ensureLoggedIn, runAsyncWrapper(async (req, res) => {
        return res.send(await InvoiceService.getInvoice(req.params.invoiceId))
    }))

    // edit invoice
    route.put('/invoice/:invoiceId', ensureRole(['accountant']), runAsyncWrapper(async (req, res) => {
        return res.send( await InvoiceService.editInvoice(req.params.invoiceId, req.body.items, req.body.buyer, req.body.seller))
    }))

    // delete invoice
    route.delete('/invoice/:invoiceId', ensureRole(['accountant']), runAsyncWrapper(async (req, res) => {
        return res.send( await InvoiceService.deleteInvoice(req.params.invoiceId))
    }))
}