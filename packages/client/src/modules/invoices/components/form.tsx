import React, { useState, useEffect, ChangeEvent } from 'react'
import { Formik, Form, Field, FieldArray } from 'formik'
import styled, { css } from 'styled-components'
import { textInput, COLORS, button, BREAKPOINTS_MAX, smallButton } from '../../../utils/styles'
import { IContact } from '../../contacts/components/list'
import { getContactList, getCompanyInfo } from '../../contacts/utils'

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

        > .form-select {
            margin-top: 15px;
            width: 100%;
        }

        > .group {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            flex-wrap: wrap;
            > .form-item {
                ${formItem}
            }
            .half {
                flex-basis: calc(50% - 20px);
                @media (max-width: ${BREAKPOINTS_MAX.MD}) {
                    flex-basis: 100%;
                }
            }
            > button {
                ${smallButton}
                cursor: pointer;
                margin-top: 8px;
                background-color: ${COLORS.pomegranate};
            }
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
    seller: {
        company: string
        street: string
        city: string
        country: string
        ic: string
        dic: string
    }
    buyer: {
        company: string
        street: string
        city: string
        country: string
        ic: string
        dic: string
    }
    items: {
        name: string
        pricePerItem: string
        quantity: string
    }[]
}

interface InvoiceFormProps {
    onSubmit: (values: any, formikbag: any) => any
    onDelete?: () => any
    initialValues?: FormValues
    buttonName: string
}

const emptyItem = {
    name: '',
    pricePerItem: '',
    quantity: '',
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ onSubmit, onDelete, initialValues, buttonName }) => {
    const [companies, setCompanies] = useState<IContact[] | undefined>(undefined)
    const [ companyInfo, setCompanyInfo ] = useState<any>(undefined)

    useEffect(() => {
        const asyncFunction = async () => {
            const data = await getContactList()
            setCompanies(data)
        }
        asyncFunction()
    }, [])

    useEffect(() => {
        const asyncFunction = async () => {
            const companyInfo = await getCompanyInfo()
            setCompanyInfo(companyInfo)
        }
        asyncFunction()
    }, [])

    if (!companies || !companyInfo) {
        return (<div>loading</div>)
    }

    const defaultInitialValues: FormValues = {
        buyer: {
            company: '',
            street: '',
            city: '',
            country: '',
            ic: '',
            dic: '',
        },
        seller: {
            company: companyInfo.company,
            street: companyInfo.street,
            city: companyInfo.city,
            country: companyInfo.country,
            ic: companyInfo.ic,
            dic: companyInfo.dic,
        },
        items: [{...emptyItem}]
    }

    return (
        <Container>
            <Formik initialValues={initialValues || defaultInitialValues} onSubmit={onSubmit}>
                {({ values, touched, setFieldValue }) => {
                    const handleBuyerChange = (event: ChangeEvent<HTMLSelectElement>) => {
                        if (!companies) {
                            return
                        }
                        const buyerId =  event.target.value
                        const buyer = companies.find(item => item._id === buyerId)
                        if (!buyer) {
                            return
                        }
                        setFieldValue('buyer.company', buyer.company)
                        setFieldValue('buyer.street', buyer.street)
                        setFieldValue('buyer.city', buyer.city)
                        setFieldValue('buyer.country', buyer.country)
                        setFieldValue('buyer.ic', buyer.ic)
                        setFieldValue('buyer.dic', buyer.dic)
                    }

                    return (
                        <Form>
                            <div className="form-section">
                                Seller
                            </div>
                            <div className="form-item">
                                <label htmlFor="seller.company">Company Name</label>
                                <Field type="text" name="seller.company" id="seller.company" />
                            </div>
                            <div className="form-item">
                                <label htmlFor="seller.street">Street</label>
                                <Field type="text" name="seller.street" id="seller.street" />
                            </div>
                            <div className="form-item">
                                <label htmlFor="seller.city">City</label>
                                <Field type="text" name="seller.city" id="seller.city" />
                            </div>
                            <div className="form-item">
                                <label htmlFor="seller.country">Country</label>
                                <Field type="text" name="seller.country" id="seller.country" />
                            </div>
                            <div className="form-item">
                                <label htmlFor="seller.ic">IC</label>
                                <Field type="text" name="seller.ic" id="seller.ic" />
                            </div>
                            <div className="form-item">
                                <label htmlFor="seller.dic">DIC</label>
                                <Field type="text" name="seller.dic" id="seller.dic" />
                            </div>

                            <div className="form-section">
                                Buyer
                            </div>
                            <select className="form-select" onChange={handleBuyerChange}>
                                {companies.map(company => (
                                    <option key={company._id} value={company._id}>{company.company}</option>
                                ))}
                            </select>
                            <div className="form-item">
                                <label htmlFor="buyer.company">Company Name</label>
                                <Field type="text" name="buyer.company" id="buyer.company" />
                            </div>
                            <div className="form-item">
                                <label htmlFor="buyer.street">Street</label>
                                <Field type="text" name="buyer.street" id="buyer.street" />
                            </div>
                            <div className="form-item">
                                <label htmlFor="buyer.city">City</label>
                                <Field type="text" name="buyer.city" id="buyer.city" />
                            </div>
                            <div className="form-item">
                                <label htmlFor="buyer.country">Country</label>
                                <Field type="text" name="buyer.country" id="buyer.country" />
                            </div>
                            <div className="form-item">
                                <label htmlFor="buyer.ic">IC</label>
                                <Field type="text" name="buyer.ic" id="buyer.ic" />
                            </div>
                            <div className="form-item">
                                <label htmlFor="buyer.dic">DIC</label>
                                <Field type="text" name="buyer.dic" id="buyer.dic" />
                            </div>

                            <div className="form-section">
                                Invoice items
                            </div>
                            <FieldArray name="items">
                                    {(arrayHelpers) => (
                                        <>
                                            {values.items && values.items.map((item, index) => (
                                                <div className="group" key={index}>
                                                    <div className="form-item">
                                                        <label htmlFor={`items.${index}.name`}>Item Name</label>
                                                        <Field type="text" name={`items.${index}.name`} id={`items.${index}.name`} />
                                                    </div>
                                                    <div className="form-item half">
                                                        <label htmlFor={`items.${index}.pricePerItem`}>Price Per Item</label>
                                                        <Field type="text" name={`items.${index}.pricePerItem`} id={`items.${index}.pricePerItem`} />
                                                    </div>
                                                    <div className="form-item half">
                                                        <label htmlFor={`items.${index}.quantity`}>Quantity</label>
                                                        <Field type="text" name={`items.${index}.quantity`} id={`items.${index}.quantity`} />
                                                    </div>
                                                    <button type="button" onClick={() => arrayHelpers.remove(index)}>REMOVE</button>
                                                </div>
                                            ))}
                                            <button className="add-button" type="button" onClick={() => arrayHelpers.push({...emptyItem})}>ADD INVOICE ITEM</button>
                                        </>
                                    )}
                            </FieldArray>
                            <div className="buttons">
                                <button className="submit-button" type="submit">{buttonName}</button>
                                {onDelete &&
                                    <div className="delete-button" onClick={onDelete}>CANCEL</div>
                                }
                            </div>
                        </Form>
                    )}}
            </Formik>
        </Container>
    )
}

export default InvoiceForm