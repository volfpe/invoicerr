import React, { useEffect, useState } from 'react'
import Layout from '../../../components/layout'
import { getContactList } from '../utils'
import Table from '../../../components/table'

export interface IContact {
    _id: string
    company: string
    street: string
    city: string
    country: string
    ic: string
    dic: string
}

const columnsTable = [
    {
        Header: 'Company',
        accessor: 'company',
    },
    {
        Header: 'Address',
        accessor: 'street',
    }
]

const ContactsList: React.FC = () => {

    const [companies, setCompanies] = useState<IContact[]>([])

    useEffect(() => {
        const asyncFunction = async () => {
            const data = await getContactList()
            setCompanies(data)
        }
        asyncFunction()
    }, [])

    return (
        <Layout>
            <Table columnsTable={columnsTable} data={companies} rowLinkPrefix="/contacts/" button={{link: '/contacts/new', text: 'ADD NEW CONTACT'}} />
        </Layout>
    )
}

export default ContactsList