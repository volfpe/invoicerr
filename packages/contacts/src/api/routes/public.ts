import { Router } from 'express'
import { Express } from 'shared'
import ContactService from '../../services/contact'
import CompanyInfoService from '../../services/company-info'

const { runAsyncWrapper, ensureRole, ensureLoggedIn } = Express

const route = Router()

export default (app: Router) => {
    app.use('/public', route)

    // get all contacts
    route.get('/contacts', ensureLoggedIn, runAsyncWrapper(async (req, res) => {
        const contacts = await ContactService.getAllContacts()
        res.send(contacts)
    }))

    // add contact // todo different role
    route.post('/contact', ensureRole(['admin']), runAsyncWrapper(async (req, res) => {
        await ContactService.addContact(req.body.name, req.body.company, req.body.street, req.body. city, req.body.country, req.body.ic, req.body.dic)
        res.send(true)
    }))

    // edit contact // todo different role
    route.put('/contact', ensureRole(['admin']), runAsyncWrapper(async (req, res) => {
        const contact = await ContactService.editContact(req.body.id, req.body.name, req.body.company, req.body.street, req.body. city, req.body.country, req.body.ic, req.body.dic)
        res.send(contact)
    }))

    // delete contact // todo different role
    route.delete('/contact', ensureRole(['admin']), runAsyncWrapper(async (req, res) => {
        await ContactService.deleteContact(req.body.id)
        res.send(true)
    }))

    // get company info
    route.get('/company-info', ensureLoggedIn, runAsyncWrapper(async (req, res) => {
        const info = await CompanyInfoService.getCompanyInfo()
        res.send(info)
    }))

    // edit company info
    route.put('/company-info', ensureRole(['admin']), runAsyncWrapper(async (req, res) => {
        const info = await CompanyInfoService.editCompanyInfo(req.body.company, req.body.street, req.body.city, req.body.country, req.body.ic, req.body.dic)
        res.send(info)
    }))
}