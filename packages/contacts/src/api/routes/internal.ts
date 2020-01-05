import { Router } from 'express'
import { Express } from 'shared'
import ContactService from '../../services/contact'
import CompanyInfoService from '../../services/company-info'
import config from '../../config';

const { runAsyncWrapper, ensureRole, ensureLoggedIn, interComMiddleware } = Express

const route = Router()

export default (app: Router) => {
    app.use('/internal', route)
    // protect internal endpoints
    route.use(interComMiddleware(config.communicationSecret))

    // get our company info
    route.get('/company-info', runAsyncWrapper(async (req, res) => {
        res.send(await CompanyInfoService.getCompanyInfo())
    }))

    // get contact by id
    route.get('/contact/:contactId', runAsyncWrapper(async (req, res) => {
        res.send(await ContactService.getContactById(req.params.contactId))
    }))
}