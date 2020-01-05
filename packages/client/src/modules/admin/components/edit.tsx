import React, { useCallback, useState, useEffect } from 'react'
import Layout from '../../../components/layout'
import InvoiceForm from './form'
import { useHistory, useParams } from 'react-router-dom'
import { editUser, getUser, deleteUser } from '../utils'
import { Api404Error } from '../../../utils/errors'

const handleSubmit = async (values: any, formikBag: any, id: string, redirectToUsers: () => void) => {
    await editUser(id, values.password, values.role)
    redirectToUsers()
}

const handleDelete = async (id: string, redirectToUsers: () => void) => {
    const confirmed = confirm('Delete user?');
    if (confirmed) {
        await deleteUser(id)
        redirectToUsers()
    }
}


const EditUser: React.FC = () => {
    const routerHistory = useHistory()
    const { id } = useParams()
    const [user, setUser] = useState<any>(undefined)
    const [error, setError] = useState(false)

    useEffect(() => {
        const asyncFunction = async () => {
            try {
                const user = await getUser(id || '')
                setUser(user)
            } catch(e) {
                if (e instanceof Api404Error) {
                    setError(true)
                }
            }
        }
        asyncFunction()
    }, [id])

    const redirectToUsers = useCallback(() => {
        routerHistory.push('/admin')
    }, [routerHistory])

    if (error) {
        return <Layout><div>User not found!</div></Layout>
    }

    if (!user) {
        return <Layout><div>loading</div></Layout>
    }

    return (
        <Layout>
            <InvoiceForm buttonName="EDIT USER" initialValues={{ username: user.username, password: '', role: user.role }} isEdit={true} onDelete={() => handleDelete(id || '', redirectToUsers)} onSubmit={(values, formikBag) => handleSubmit(values, formikBag, id || '', redirectToUsers)} />
        </Layout>
    )
}

export default EditUser