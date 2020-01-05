import React, { useState, useEffect } from 'react'
import Layout from '../../../components/layout'
import { getUsers } from '../utils'
import Table from '../../../components/table'

const columnsTable = [
    {
        Header: 'Username',
        accessor: 'username',
    },
    {
        Header: 'Role',
        accessor: 'role',
    }
]

const UserList: React.FC = () => {
    const [ users, setUsers ] = useState([])

    useEffect(() => {
        const asyncFunction = async () => {
            const data = await getUsers()
            setUsers(data)
        }
        asyncFunction()
    }, [])

    return (
        <Layout>
            <Table columnsTable={columnsTable} data={users} rowLinkPrefix="/admin/" button={{link: '/admin/new', text: 'CREATE USER'}} />
        </Layout>
        )
}

export default UserList