import React, { useCallback, useEffect, useState } from 'react'
import Layout from '../../../components/layout'
import ContactForm from './form'
import Formik from 'formik'
import { editContact, getContact, deleteContact } from '../utils'
import { useHistory, useParams } from 'react-router-dom'
import { Api404Error } from '../../../utils/errors'

const handleDelete = async (id: string, redirectToContacts: () => void) => {
    const confirmed = confirm('Delete contact?');
    if (confirmed) {
        await deleteContact(id)
        redirectToContacts()
    }
}
const handleSubmit = async (values: any, formikBag: Formik.FormikHelpers<any>, id: string, redirectToContacts: () => void) => {
    await editContact(id, values.company, values.street, values.city, values.country, values.ic, values.dic)
    redirectToContacts()
}

const EditContact: React.FC = () => {
    const routerHistory = useHistory()
    const { id } = useParams()
    const [ contact, setContact ] = useState(undefined)
    const [ error, setError ] = useState(false)

    useEffect(() => {
        const asyncFunction = async () => {
            try {
                const contact = await getContact(id || '')
                setContact(contact)
            } catch(e) {
                if (e instanceof Api404Error) {
                    setError(true)
                }
            }
        }
        asyncFunction()
    }, [id])

    const redirectToContacts = useCallback(() => {
        routerHistory.push('/contacts')
    }, [routerHistory])

    if (error) {
        return <Layout><div>Contact not found!</div></Layout>
    }

    if (!contact) {
        return <Layout><div>loading</div></Layout>
    }

    return (
        <Layout>
            <ContactForm initialValues={contact} onSubmit={(values, formikBag) => handleSubmit(values, formikBag, id || '', redirectToContacts)} onDelete={() => handleDelete(id || '', redirectToContacts)} buttonName="EDIT CONTACT" />
        </Layout>
    )
}

export default EditContact