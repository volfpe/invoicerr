import InvoiceModel, { IInoivceContactInput, IInvoiceRecordInput } from '../models/invoice'
import axios from 'axios'
import config from '../config'

const InvoiceService = {
    createInvoice: async (records: IInvoiceRecordInput[], buyer: IInoivceContactInput, seller: IInoivceContactInput) => {
        const invoice = new InvoiceModel({
            seller,
            buyer,
            items: records,
            isValid: true
        })

        return await invoice.save()
    },
    editInvoice: async (id: string, records: IInvoiceRecordInput[], buyer: IInoivceContactInput, seller: IInoivceContactInput) => {
        const invoice = await InvoiceModel.where('_id', id).findOne()
        if (!invoice) {
            throw new Error('invoice not found!')
        }

        invoice.seller = seller
        invoice.buyer = buyer
        invoice.items = records

        await invoice.save()
    },
    deleteInvoice: async (id: string) => {
        const invoice = await InvoiceModel.where('_id', id).findOne()
        if (!invoice) {
            throw new Error('invoice not found!')
        }

        invoice.isValid = false

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