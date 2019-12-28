import mongoose from 'mongoose'

const InvoiceSchema = new mongoose.Schema({
    isActive: {
        type: Boolean,
        required: true,
    }
},
    { timestamps: true }
)

export default mongoose.model('Invoice', InvoiceSchema)