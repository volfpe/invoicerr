import InvoiceModel, { IInoivceContactInput, IInvoiceRecordInput } from '../models/invoice'
import axios from 'axios'
import config from '../config'

const InvoiceService = {
    createInvoice: async (records: IInvoiceRecordInput[], buyerId: string) => {
        // get buyer contact info
        const buyerContact = await axios.get(config.services.contacts + '/internal/contact/' + buyerId, {
            headers: {
                authorization: config.communicationSecret
            }
        })
        const companyContact = await axios.get(config.services.contacts + '/internal/company-info', {
            headers: {
                authorization: config.communicationSecret
            }
        })

        const buyer: IInoivceContactInput = {
            company: buyerContact.data.company,
            street: buyerContact.data.street,
            city: buyerContact.data.city,
            country: buyerContact.data.country,
            ic: buyerContact.data.ic,
            dic: buyerContact.data.dic
        }

        const seller: IInoivceContactInput = {
            company: companyContact.data.company,
            street: companyContact.data.street,
            city: companyContact.data.city,
            country: companyContact.data.country,
            ic: companyContact.data.ic,
            dic: companyContact.data.dic
        }

        const invoice = new InvoiceModel({
            seller,
            buyer,
            items: records,
            isValid: true
        })

        return await invoice.save()
    },
    editInvoice: async (id: string, records: IInvoiceRecordInput[], buyerId: string) => {
        const invoice = await InvoiceModel.where('_id', id).findOne()
        if (!invoice) {
            throw new Error('invoice not found!')
        }
        
        const buyerContact = await axios.get(config.services.contacts + '/internal/contact/' + buyerId, {
            headers: {
                authorization: config.communicationSecret
            }
        })
        const buyer: IInoivceContactInput = {
            company: buyerContact.data.company,
            street: buyerContact.data.street,
            city: buyerContact.data.city,
            country: buyerContact.data.country,
            ic: buyerContact.data.ic,
            dic: buyerContact.data.dic
        }

        invoice.buyer = buyer
        invoice.items = records

        await invoice.save()
    },
    getInvoices: async () => {
        return await InvoiceModel.find()
    },
    getInvoice: async (id: string) => {
        const invoice = await InvoiceModel.where('_id', id).findOne()
        if (!invoice) {
            throw new Error('invoice not found!')
        }
        return invoice
    }
}

export default InvoiceService