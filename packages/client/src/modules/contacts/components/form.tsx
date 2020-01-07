import React from 'react'
import { Formik, Form, Field } from 'formik'
import styled from 'styled-components'
import { textInput, COLORS, button, BREAKPOINTS_MAX } from '../../../utils/styles'

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
        }
        > .buttons {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            margin-top: 40px;
            > button {
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

interface ContactFormProps {
    onSubmit: (values: any, formikbag: any) => any
    onDelete?: () => void
    initialValues?: {
        name: string
        street: string
        city: string
        country: string
        ic: string
        dic: string
    }
    buttonName: string
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, onDelete, initialValues, buttonName }) => {
    return (
        <Container>
            <Formik initialValues={initialValues || {}} onSubmit={onSubmit}>
                {() => (
                    <Form>
                        <div className="form-item">
                            <label htmlFor="company">Company Name</label>
                            <Field type="text" name="company" id="company" />
                        </div>
                        <div className="form-item">
                            <label htmlFor="street">Street</label>
                            <Field type="text" name="street" id="street" />
                        </div>
                        <div className="form-item">
                            <label htmlFor="city">City</label>
                            <Field type="text" name="city" id="city" />
                        </div>
                        <div className="form-item">
                            <label htmlFor="country">Country</label>
                            <Field type="text" name="country" id="country" />
                        </div>
                        <div className="form-item">
                            <label htmlFor="ic">IC</label>
                            <Field type="text" name="ic" id="ic" />
                        </div>
                        <div className="form-item">
                            <label htmlFor="dic">DIC</label>
                            <Field type="text" name="dic" id="dic" />
                        </div>
                        <div className="buttons">
                            <button type="submit">{buttonName}</button>
                            {onDelete &&
                                <div className="delete-button" onClick={onDelete}>DELETE</div>
                            }
                        </div>
                    </Form>
                )}
            </Formik>
        </Container>
    )
}

export default ContactForm