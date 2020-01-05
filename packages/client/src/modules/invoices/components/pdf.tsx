import React, { useState, useEffect } from 'react'
import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer'
import styled from 'styled-components'
import Layout from '../../../components/layout'
import { useParams } from 'react-router-dom'
import { getInvoice } from '../utils'
import { Api404Error } from '../../../utils/errors'

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 30,
    },
    contactInformations: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buyer: {
        padding: 10,
        width: 200,
    },
    seller: {
        padding: 10,
        display: 'flex',
        alignItems: 'flex-end',
        width: 200,
        backgroundColor: '#DDDADA',
        borderWidth: 1,
        borderColor: '#7F7E7E',
    },
    contactTextHeader: {
        fontSize: 12,
        padding: 8,
        backgroundColor: '#DDDADA',
        borderWidth: 1,
        borderColor: '#7F7E7E',
        marginBottom: 10,
    },
    text: {
        fontSize: 12,
    },
    textSmall: {
        fontSize: 10,
    },
    textHeader: {
        fontSize: 13,
        marginBottom: 5,
    },
    items: {
        marginTop: 50,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        borderWidth: 1,
        borderColor: '#7F7E7E',
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
    },
    itemDescription: {
        padding: 3,
        width: '70%',
        borderRightWidth: 1,
        borderRightColor: '#7F7E7E',
    },
    itemQuantity: {
        padding: 3,
        width: '15%',
        borderRightWidth: 1,
        borderRightColor: '#7F7E7E',
    },
    itemPrice: {
        padding: 3,
        width: '15%',
    },
    itemHeader: {
        backgroundColor: '#DDDADA',
        borderBottomWidth: 1,
        borderBottomColor: '#7F7E7E',
    },
    totalPrice: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    }
})

const Container = styled.div`
    width: 100vw;
    height: 100vh;
`

const InvoicePdf: React.FC = () => {
    const { id } = useParams()
    const [ invoice, setInvoice ] = useState<any>(undefined)
    const [ error, setError ] = useState(false)

    useEffect(() => {
        const asyncFunction = async () => {
            try {
                const invoice = await getInvoice(id || '')
                setInvoice(invoice)
            } catch(e) {
                if (e instanceof Api404Error) {
                    setError(true)
                }
            }
        }
        asyncFunction()
    }, [id])

    if (error) {
        return <Layout><div>Invoice not found!</div></Layout>
    }

    if (!invoice) {
        return <Layout><div>loading</div></Layout>
    }

    return (
        <Container>
            <PDFViewer style={{width: '100%', height: '100%'}}>
                <Document>
                    <Page size="A4">
                        <View style={styles.container}>
                            <View>
                                <Text style={styles.text}>Invoice ID: {invoice._id}</Text>
                                <Text style={styles.text}>Date of Issue: {invoice.createdAt}</Text>
                            </View>
                            <View style={styles.contactInformations}>
                                <View style={styles.buyer}>
                                    <Text style={styles.contactTextHeader}>BILL TO:</Text>
                                    <Text style={styles.textHeader}>{invoice.buyer.company}</Text>
                                    <Text style={styles.text}>{invoice.buyer.street}, {invoice.buyer.city}</Text>
                                    <Text style={styles.text}>{invoice.buyer.country}</Text>
                                    <Text style={styles.text}>IC: {invoice.buyer.ic}</Text>
                                    <Text style={styles.text}>DIC: {invoice.buyer.dic}</Text>
                                </View>
                                <View style={styles.seller}>
                                    <Text style={styles.textHeader}>{invoice.seller.company}</Text>
                                    <Text style={styles.text}>{invoice.buyer.street}, {invoice.seller.city}</Text>
                                    <Text style={styles.text}>{invoice.seller.country}</Text>
                                    <Text style={styles.text}>IC: {invoice.seller.ic}</Text>
                                    <Text style={styles.text}>DIC: {invoice.seller.dic}</Text>
                                </View>
                            </View>
                            <View style={styles.items}>
                                <View style={styles.item}>
                                    <View style={[styles.itemDescription, styles.itemHeader]}>
                                        <Text style={styles.textSmall}>Description</Text>
                                    </View>
                                    <View style={[styles.itemQuantity, styles.itemHeader]}>
                                        <Text style={styles.textSmall}>Quantity</Text>
                                    </View>
                                    <View style={[styles.itemPrice, styles.itemHeader]}>
                                        <Text style={styles.textSmall}>Price</Text>
                                    </View>
                                </View>
                                {invoice.items.map((item: any) => (
                                    <View key={item._id} style={styles.item}>
                                        <View style={styles.itemDescription}>
                                            <Text style={styles.textSmall}>{item.name}</Text>
                                        </View>
                                        <View style={styles.itemQuantity}>
                                            <Text style={styles.textSmall}>{item.quantity}</Text>
                                        </View>
                                        <View style={styles.itemPrice}>
                                            <Text style={styles.textSmall}>${item.totalPrice}</Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                            <View style={styles.totalPrice}>
                                <Text style={styles.text}>Total price: ${invoice.totalPrice}</Text>
                            </View>
                        </View>
                    </Page>
                </Document>
            </PDFViewer>
        </Container>
    )
}

export default InvoicePdf