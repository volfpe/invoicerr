import React, { useState } from 'react'
import Layout from '../../../components/layout'
import ContactForm from './password-form'
import Formik from 'formik'
import { changePassword } from '../utils'
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

const handleSubmit = async (values: any, formikBag: Formik.FormikHelpers<any>, setSuccess: (success: boolean) => void) => {
    setSuccess(false)
    if (values.newPassword !== values.newPasswordAgain) {
        formikBag.setErrors({ newPassword: 'Passwords do not match!' })
        return
    }
    await changePassword(values.password, values.newPassword)
    setSuccess(true)
}

const UserSettings: React.FC = () => {
    const [ success, setSuccess ] = useState(false)

    return (
        <Layout>
            {success && <SuccessContainer>Success</SuccessContainer>}
            <ContactForm onSubmit={(values, formikBag) => handleSubmit(values, formikBag, setSuccess)} buttonName="EDIT COMPANY INFO" />
        </Layout>
    )
}

export default UserSettings