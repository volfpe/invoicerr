import { apiCall } from "../../../utils/helpers"
import { API_ENDPOINTS } from "../../../config"
import { Api404Error } from "../../../utils/errors"

export const getContactList = async () => {
    return (await apiCall(API_ENDPOINTS.CONTACTS_LIST, 'get')).data
}

export const getContact = async (id: string) => {
    try {
        return (await apiCall(API_ENDPOINTS.GET_CONTACT + '/' + id, 'get')).data
    } catch (e) {
        throw new Api404Error()
    }
}

export const getCompanyInfo = async () => {
    return (await apiCall(API_ENDPOINTS.GET_COMPANY_INFO, 'get')).data
}

export const editCompanyInfo = async (company: string, street: string, city: string, country: string, ic: string, dic: string) => {
    return (await apiCall(API_ENDPOINTS.EDIT_COMPANY_INFO, 'put', {company, street, city, country, ic, dic})).data
}

export const addContact = async (company: string, street: string, city: string, country: string, ic: string, dic: string) => {
    return (await apiCall(API_ENDPOINTS.ADD_CONTACT, 'post', {company, street, city, country, ic, dic})).data
}

export const editContact = async (id: string, company: string, street: string, city: string, country: string, ic: string, dic: string) => {
    return (await apiCall(API_ENDPOINTS.EDIT_CONTACT, 'put', {id, company, street, city, country, ic, dic})).data
}

export const deleteContact = async (id: string) => {
    return (await apiCall(API_ENDPOINTS.DELETE_CONTACT + '/' + id, 'delete')).data
}