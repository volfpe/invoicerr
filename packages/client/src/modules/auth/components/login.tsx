import React, { useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { COLORS, BREAKPOINTS_MAX, FONTS, shadow, textInput, button } from '../../../utils/styles'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useHistory } from 'react-router-dom'
import { apiCall } from '../../../utils/helpers'
import { API_ENDPOINTS } from '../../../config'

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100vw;
    min-height: 100vh;
    background-color: ${COLORS.clouds};

    > .login-box {
        ${shadow}
        width: 500px;
        height: 400px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: ${COLORS.white};

        @media (max-width: ${BREAKPOINTS_MAX.MD}) {
            width: 100vw;
            min-height: 100vh;
        }

        > .header {
            ${FONTS.montserrat}
            font-weight: bold;
            font-size: 28px;
            color: ${COLORS.belize}
        }
        > .form-container {
            margin-top: 30px;
            width: 100%;
            > .form {
                display: flex;
                flex-direction: column;
                align-items: center;
                

                > input[type="text"], input[type="password"] {
                    ${textInput}
                    margin-top: 20px;
                    width: 250px;
                    @media (max-width: ${BREAKPOINTS_MAX.MD}) {
                        width: calc(100% - 40px - 30px);
                        margin-left: 20px;
                        margin-right: 20px;
                    }
                }

                > button {
                    ${button}
                    margin-top: 40px;
                    width: 250px;
                    @media (max-width: ${BREAKPOINTS_MAX.MD}) {
                        width: calc(100% - 40px - 30px);
                        margin-left: 20px;
                        margin-right: 20px;
                    }
                }

                > .error {
                    ${FONTS.montserrat}
                    color: ${COLORS.alizarin};
                    margin-top: 5px;
                }
            }
        }
    }
`

const handleLogin = async (username: string, password: string, setError: () => void, redirectToDashboard: () => void) => {
    const apiData = {
        username,
        password
    }
    try {
        const result = await apiCall(API_ENDPOINTS.LOGIN, 'post', apiData)
        localStorage.setItem('token', result.data)
        const userData = await apiCall(API_ENDPOINTS.ME, 'get')
        localStorage.setItem('role', userData.data.role)
        redirectToDashboard()
    } catch (e) {
        setError()
    }
}

const Login: React.FC = () => {
    const routerHistory = useHistory()

    const redirectToDashboard = useCallback(() => {
        routerHistory.push('/dashboard')
    }, [routerHistory])
    
    // check if user is already logged in. If yes, redirect
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            redirectToDashboard()
        }
    }, [redirectToDashboard])

    return(
        <Container>
            <div className="login-box">
                <div className="header">INVOICERR</div>
                <div className="form-container">
                    <Formik initialValues={{ username: '', password: '' }} onSubmit={async (values, formikBag) => {
                        await handleLogin(values.username, values.password, () => formikBag.setErrors({ password: 'Invalid password!' }), redirectToDashboard)
                    }}>
                        {() => (
                            <Form className="form">
                                <Field className="form-item" type="text" name="username" placeholder="Username" />
                                <Field className="form-item" type="password" name="password" placeholder="Password" />
                                <div className="error">
                                    <ErrorMessage name="password" />
                                </div>
                                <button type="submit">LOGIN</button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </Container>
    )
}

export default Login