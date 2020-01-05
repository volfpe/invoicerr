import { apiCall } from "../../../utils/helpers"
import { API_ENDPOINTS } from "../../../config"
import { Api404Error } from "../../../utils/errors"

export const getInvoices = async () => {
    return (await apiCall(API_ENDPOINTS.GET_INVOICES, 'get')).data
}

export interface InvoiceItem {
    name: string
    pricePerItem: number
    quantity: number
}

export interface Contact {
    company: string
    street: string
    city: string
    country: string
    ic: string
    dic: string
}

export const addInvoice = async (buyer: Contact, seller: Contact, items: InvoiceItem[]) => {
    return (await apiCall(API_ENDPOINTS.ADD_INVOICE, 'post', {buyer, seller, items})).data
}

export const editInvoice = async (id: string, buyer: Contact, seller: Contact, items: InvoiceItem[]) => {
    return (await apiCall(API_ENDPOINTS.EDIT_INVOICE + '/' + id, 'put', {id, buyer, seller, items})).data
}

export const getInvoice = async (id: string) => {
    try {
        return (await apiCall(API_ENDPOINTS.GET_INVOICE + '/' + id, 'get')).data
    } catch (e) {
        throw new Api404Error()
    }
}

export const deleteInvoice = async (id: string) => {
    return (await apiCall(API_ENDPOINTS.DELETE_INVOICE + '/' + id, 'delete')).data
}