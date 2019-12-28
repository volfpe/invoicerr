import mongoose from 'mongoose'

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
})

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
    { timestamps: true }
)

InvoiceRecord.virtual('totalPrice').get(function(this: any) {
    return this.pricePerItem * this.quantity
})

InvoiceSchema.virtual('totalPrice').get(function(this: any) {
    return this.items.reduce((acc: number, item: any) => acc + item.totalPrice, 0)
})

export default mongoose.model('Invoice', InvoiceSchema)