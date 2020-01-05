export default {
    API_URL: process.env.REACT_APP_API_URL || 'http://localhost:3030'
}

export const API_ENDPOINTS = {
    CONTACTS_LIST: '/contacts/contacts',
    ADD_CONTACT: '/contacts/contact',
    GET_CONTACT: '/contacts/contact',
    EDIT_CONTACT: '/contacts/contact',
    DELETE_CONTACT: '/contacts/contact',
    GET_COMPANY_INFO: '/contacts/company-info',
    EDIT_COMPANY_INFO: '/contacts/company-info',
    GET_INVOICES: '/invoice/invoices',
    ADD_INVOICE: '/invoice/invoice',
    EDIT_INVOICE: '/invoice/invoice',
    GET_INVOICE: '/invoice/invoice',
    DELETE_INVOICE: '/invoice/invoice',
    GET_USERS: '/auth/users',
    ADD_USER: '/auth/user',
    EDIT_USER: '/auth/user',
    GET_USER: '/auth/user',
    DELETE_USER: '/auth/user',
    CHANGE_PASSWORD: '/auth/change-password',
    ME: '/auth/me',
    LOGIN: '/auth/login'
}