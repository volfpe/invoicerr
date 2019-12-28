import mongoose from 'mongoose'

interface IInvoiceRecord extends mongoose.Document {
    name: string
    pricePerItem: number
    quantity: number
}

export interface IInvoiceRecordInput {
    name: IInvoiceRecord['name']
    pricePerItem: IInvoiceRecord['pricePerItem']
    quantity: IInvoiceRecord['quantity']
}

interface IInvoiceContact extends mongoose.Document {
    company: string
    street: string
    city: string
    country: string
    ic: string
    dic: string
}

export interface IInoivceContactInput {
    company: IInvoiceContact['company']
    street: IInvoiceContact['street']
    city: IInvoiceContact['city']
    country: IInvoiceContact['country']
    ic: IInvoiceContact['ic']
    dic: IInvoiceContact['dic']
}

interface IInvoice extends mongoose.Document {
    seller: IInvoiceContact,
    buyer: IInvoiceContact,
    items: IInvoiceRecord[],
    isValid: boolean
}

const schemaOptions = {
    toObject: {
        virtuals: true
    }
    ,toJSON: {
        virtuals: true
    }
}

const InvoiceRecord = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    pricePerItem: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
}, schemaOptions)

const InvoiceContact = new mongoose.Schema({
    company: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    ic: {
        type: String,
    },
    dic: {
        type: String,
    },
})

const InvoiceSchema = new mongoose.Schema({
    seller: {
        type: InvoiceContact,
        required: true
    },
    buyer: {
        type: InvoiceContact,
        required: true
    },
    items: {
        type: [InvoiceRecord]
    },
    isValid: {
        type: Boolean,
        required: true,
    }
},
    { ...schemaOptions, timestamps: true }
)

InvoiceRecord.virtual('totalPrice').get(function(this: IInvoiceRecord) {
    return this.pricePerItem * this.quantity
})

InvoiceSchema.virtual('totalPrice').get(function(this: any) {
    return this.items.reduce((acc: number, item: any) => acc + item.totalPrice, 0)
})



export default mongoose.model<IInvoice>('Invoice', InvoiceSchema)