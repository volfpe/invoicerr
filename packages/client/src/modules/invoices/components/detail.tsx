import React from 'react'
import { useUserInfo } from '../../../utils/hooks'
import Layout from '../../../components/layout'
import EditInvoice from './edit'
import styled from 'styled-components'
import { COLORS } from '../../../utils/styles'
import { Link, useParams } from 'react-router-dom'

const DownloadContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    font-weight: bold;
    font-size: 18px;
    color: ${COLORS.belize};
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`

const InvoiceDetail: React.FC = () => {
    const { role } = useUserInfo()
    const { id } = useParams()

    return (
        <Layout>
            <Link to={'/invoices/pdf/' + id}><DownloadContainer>Show Invoice</DownloadContainer></Link>
            {role === 'accountant' && <EditInvoice /> }
        </Layout>
    )
}

export default InvoiceDetail