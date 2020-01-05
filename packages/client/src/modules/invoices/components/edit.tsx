import React, { useCallback, useState, useEffect } from 'react'
import Layout from '../../../components/layout'
import InvoiceForm from './form'
import { useHistory, useParams } from 'react-router-dom'
import { editInvoice, getInvoice, deleteInvoice } from '../utils'
import { Api404Error } from '../../../utils/errors'

const handleSubmit = async (values: any, formikBag: any, id: string, redirectToInvoices: () => void) => {
    await editInvoice(id, values.buyer, values.seller, values.items)
    redirectToInvoices()
}

const handleDelete = async (id: string, redirectToInvoices: () => void) => {
    const confirmed = confirm('Cancel invoice?');
    if (confirmed) {
        await deleteInvoice(id)
        redirectToInvoices()
    }
}


const EditInvoice: React.FC = () => {
    const routerHistory = useHistory()
    const { id } = useParams()
    const [ invoice, setInvoice ] = useState<any>(undefined)
    const [ error, setError ] = useState(false)

    useEffect(() => {
        const asyncFunction = async () => {
            try {
                const invoice = await getInvoice(id || '')
                setInvoice(invoice)
            } catch(e) {
                if (e instanceof Api404Error) {
                    setError(true)
                }
            }
        }
        asyncFunction()
    }, [id])

    const redirectToInvoices = useCallback(() => {
        routerHistory.push('/invoices')
    }, [routerHistory])

    if (error) {
        return <Layout><div>Invoice not found!</div></Layout>
    }

    if (!invoice) {
        return <Layout><div>loading</div></Layout>
    }

    return (
        <InvoiceForm buttonName="EDIT INVOICE" initialValues={{buyer: invoice.buyer, seller: invoice.seller, items: invoice.items}} onSubmit={(values, formikBag) => handleSubmit(values, formikBag, id || '', redirectToInvoices)} onDelete={() => handleDelete(id || '', redirectToInvoices)} />
    )
}

export default EditInvoice