import React from 'react'
import { Formik, Form, Field } from 'formik'
import styled, { css } from 'styled-components'
import { textInput, COLORS, button, BREAKPOINTS_MAX, smallButton } from '../../../utils/styles'
import { Role } from '../../../utils/types'

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

            > .delete-button {
                ${button}
                background-color: ${COLORS.pomegranate};
                cursor: pointer;
                width: 130px;
            }
        }
    }
`

interface FormValues {
    username: string
    password: string
    role: string
}


interface InvoiceFormProps {
    onSubmit: (values: any, formikbag: any) => any
    onDelete?: () => any
    isEdit?: boolean
    initialValues?: FormValues
    buttonName: string
}

const defaultInitialValues: FormValues = {
    username: '',
    password: '',
    role: 'user',
}

const ROLES: Role[] = [
    'user',
    'accountant',
    'admin',
]

const InvoiceForm: React.FC<InvoiceFormProps> = ({ onSubmit, isEdit, onDelete, initialValues, buttonName }) => {

    return (
        <Container>
            <Formik initialValues={initialValues || defaultInitialValues} onSubmit={onSubmit}>
                {({ values }) => {

                    return (
                        <Form>
                            <div className="form-item">
                                <label htmlFor="username">Username</label>
                                <Field type="text" name="username" disabled={isEdit} />
                            </div>

                            <div className="form-item">
                                <label htmlFor="password">Password</label>
                                <Field type="password" name="password" />
                                {isEdit && 'leave blank to keep the same password'}
                            </div>

                            <div className="form-item">
                                <label htmlFor="role">Role</label>
                                <Field as="select" name="role">
                                    {ROLES.map(role => (
                                        <option key={role} value={role}>{role}</option>
                                    ))}
                                </Field>
                            </div>
                            
                            <div className="buttons">
                                <button className="submit-button" type="submit">{buttonName}</button>
                                {onDelete &&
                                    <div className="delete-button" onClick={onDelete}>DELETE</div>
                                }
                            </div>
                        </Form>
                    )}}
            </Formik>
        </Container>
    )
}

export default InvoiceForm