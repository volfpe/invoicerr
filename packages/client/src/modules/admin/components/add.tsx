import React, { useCallback } from 'react'
import Layout from '../../../components/layout'
import InvoiceForm from './form'
import { useHistory } from 'react-router-dom'
import { addUser } from '../utils'

const handleSubmit = async (values: any, formikBag: any, redirectToUsers: () => void) => {
    await addUser(values.username, values.password, values.role)
    redirectToUsers()
}


const AddUser: React.FC = () => {
    const routerHistory = useHistory()

    const redirectToUsers = useCallback(() => {
        routerHistory.push('/admin')
    }, [routerHistory])

    return (
        <Layout>
            <InvoiceForm buttonName="ADD USER" onSubmit={(values, formikBag) => handleSubmit(values, formikBag, redirectToUsers)} />
        </Layout>
    )
}

export default AddUser