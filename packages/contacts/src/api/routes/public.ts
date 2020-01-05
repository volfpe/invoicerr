import { Router } from 'express'
import { Express } from 'shared'
import ContactService from '../../services/contact'
import CompanyInfoService from '../../services/company-info'

const { runAsyncWrapper, ensureRole, ensureLoggedIn } = Express

const route = Router()

export default (app: Router) => {
    app.use('/public', route)

    // get all contacts
    route.get('/contacts', ensureRole(['accountant']), runAsyncWrapper(async (req, res) => {
        const contacts = await ContactService.getAllContacts()
        res.send(contacts)
    }))

    // add contact
    route.post('/contact', ensureRole(['accountant']), runAsyncWrapper(async (req, res) => {
        await ContactService.addContact(req.body.company, req.body.street, req.body. city, req.body.country, req.body.ic, req.body.dic)
        res.send(true)
    }))

    // edit contact
    route.put('/contact', ensureRole(['accountant']), runAsyncWrapper(async (req, res) => {
        const contact = await ContactService.editContact(req.body.id, req.body.company, req.body.street, req.body. city, req.body.country, req.body.ic, req.body.dic)
        res.send(contact)
    }))

    // delete contact
    route.delete('/contact/:contactId', ensureRole(['accountant']), runAsyncWrapper(async (req, res) => {
        await ContactService.deleteContact(req.params.contactId)
        res.send(true)
    }))

    // get contact by id
    route.get('/contact/:contactId', ensureRole(['accountant']), runAsyncWrapper(async (req, res) => {
        res.send(await ContactService.getContactById(req.params.contactId))
    }))

    // get company info
    route.get('/company-info', ensureRole(['accountant']), runAsyncWrapper(async (req, res) => {
        const info = await CompanyInfoService.getCompanyInfo()
        res.send(info)
    }))

    // edit company info
    route.put('/company-info', ensureRole(['accountant']), runAsyncWrapper(async (req, res) => {
        const info = await CompanyInfoService.editCompanyInfo(req.body.company, req.body.street, req.body.city, req.body.country, req.body.ic, req.body.dic)
        res.send(info)
    }))
}