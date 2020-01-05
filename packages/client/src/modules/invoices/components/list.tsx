import React, { useState, useEffect } from 'react'
import Layout from '../../../components/layout'
import { getInvoices } from '../utils'
import Table from '../../../components/table'
import { useUserInfo } from '../../../utils/hooks'

const columnsTable = [
    {
        Header: 'Company',
        accessor: 'buyer.company',
    },
    {
        Header: 'Total Price',
        accessor: 'totalPrice',
    },
    {
        Header: 'Created',
        accessor: 'createdAt',
    },
    {
        Header: 'Valid',
        accessor: (row: any) => row.isValid ? 'yes' : 'no',
    }
]

const InvoiceList: React.FC = () => {
    const [ invoices, setInvoices ] = useState([])
    const { role } = useUserInfo()

    useEffect(() => {
        const asyncFunction = async () => {
            const data = await getInvoices()
            setInvoices(data)
        }
        asyncFunction()
    }, [])

    let tableButton = undefined
    if (role === 'accountant') {
        tableButton = {
            link: '/invoices/new',
            text: 'NEW INVOICE'
        }
    }

    return (
        <Layout>
            <Table columnsTable={columnsTable} data={invoices} rowLinkPrefix="/invoices/" button={tableButton} />
        </Layout>
        )
}

export default InvoiceList