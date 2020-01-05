import React, { useCallback } from 'react'
import Layout from '../../../components/layout'
import InvoiceForm from './form'
import { useHistory } from 'react-router-dom'
import { addInvoice } from '../utils'

const handleSubmit = async (values: any, formikBag: any, redirectToInvoices: () => void) => {
    await addInvoice(values.buyer, values.seller, values.items)
    redirectToInvoices()
}


const AddInvoice: React.FC = () => {
    const routerHistory = useHistory()

    const redirectToInvoices = useCallback(() => {
        routerHistory.push('/invoices')
    }, [routerHistory])

    return (
        <Layout>
            <InvoiceForm buttonName="CREATE INVOICE" onSubmit={(values, formikBag) => handleSubmit(values, formikBag, redirectToInvoices)} />
        </Layout>
    )
}

export default AddInvoice