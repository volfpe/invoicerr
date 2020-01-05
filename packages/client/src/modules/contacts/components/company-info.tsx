import React, { useEffect, useState } from 'react'
import Layout from '../../../components/layout'
import ContactForm from './form'
import Formik from 'formik'
import { getCompanyInfo, editCompanyInfo } from '../utils'
import styled from 'styled-components'
import { COLORS } from '../../../utils/styles'

const SuccessContainer = styled.div`
    color: ${COLORS.white};
    background-color: ${COLORS.nephritis};
    padding: 10px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
`

const handleSubmit = async (values: any, formikBag: Formik.FormikHelpers<any>) => {
    await editCompanyInfo(values.company, values.street, values.city, values.country, values.ic, values.dic)
}

const EditCompanyInfo: React.FC = () => {
    const [ companyInfo, setCompanyInfo ] = useState(undefined)
    const [ success, setSuccess ] = useState(false)

    useEffect(() => {
        const asyncFunction = async () => {
            const companyInfo = await getCompanyInfo()
            setCompanyInfo(companyInfo)
        }
        asyncFunction()
    }, [])

    if (!companyInfo) {
        return <Layout><div>loading</div></Layout>
    }

    return (
        <Layout>
            {success && <SuccessContainer>Success</SuccessContainer>}
            <ContactForm initialValues={companyInfo} onSubmit={async (values, formikBag) => {await handleSubmit(values, formikBag); setSuccess(true)}} buttonName="EDIT COMPANY INFO" />
        </Layout>
    )
}

export default EditCompanyInfo