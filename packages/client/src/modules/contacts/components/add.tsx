import React, { useCallback } from 'react'
import Layout from '../../../components/layout'
import ContactForm from './form'
import Formik from 'formik'
import { addContact } from '../utils'
import { useHistory } from 'react-router-dom'

const handleSubmit = async (values: any, formikBag: Formik.FormikHelpers<any>, redirectToContacts: () => void) => {
    await addContact(values.company, values.street, values.city, values.country, values.ic, values.dic)
    redirectToContacts()
}

const AddContact: React.FC = () => {
    const routerHistory = useHistory()

    const redirectToContacts = useCallback(() => {
        routerHistory.push('/contacts')
    }, [routerHistory])

    return (
        <Layout>
            <ContactForm onSubmit={(values, formikBag) => handleSubmit(values, formikBag, redirectToContacts)} buttonName="ADD CONTACT" />
        </Layout>
    )
}

export default AddContact