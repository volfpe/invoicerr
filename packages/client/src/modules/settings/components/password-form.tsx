import React from 'react'
import { Formik, Form, Field } from 'formik'
import styled, { css } from 'styled-components'
import { textInput, COLORS, button, BREAKPOINTS_MAX, smallButton } from '../../../utils/styles'

const formItem = css`
    flex-basis: 100%;
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    > label {
        font-weight: bold;
        font-size: 14px;
        color: ${COLORS.belize}
    }
    > input {
        ${textInput}
        margin-top: 5px;
    }
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > form {
        width: 400px;
        @media (max-width: ${BREAKPOINTS_MAX.MD}) {
            width: 100%;
        }

        > .form-section {
            margin-top: 30px;
            font-size: 18px;
            font-weight: bold;
            color: ${COLORS.belize};
            border-bottom: 2px solid ${COLORS.belize};
        }

        > .form-item {
            ${formItem}
        }

        > .add-button {
            ${smallButton}
            margin-top: 20px;
        }
        > .buttons {
            margin-top: 40px;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            > .submit-button {
                ${button}
                cursor: pointer;
                width: 130px;
            }
        }
    }
`

interface FormValues {
    password: string
    newPassword: string
}


interface SettingsFormProps {
    onSubmit: (values: any, formikbag: any) => any
    initialValues?: FormValues
    buttonName: string
}

const defaultInitialValues: FormValues = {
    password: '',
    newPassword: '',
}

const SettingsForm: React.FC<SettingsFormProps> = ({ onSubmit, initialValues }) => {

    return (
        <Container>
            <Formik initialValues={initialValues || defaultInitialValues} onSubmit={onSubmit}>
                {({ values }) => {

                    return (
                        <Form>
                            <div className="form-section">
                                Change password
                            </div>
                            <div className="form-item">
                                <label htmlFor="password">Current password</label>
                                <Field type="password" name="password"/>
                            </div>

                            <div className="form-item">
                                <label htmlFor="newPassword">New password</label>
                                <Field type="password" name="newPassword" />
                            </div>
                            
                            <div className="buttons">
                                <button className="submit-button" type="submit">SAVE</button>
                            </div>
                        </Form>
                    )}}
            </Formik>
        </Container>
    )
}

export default SettingsForm