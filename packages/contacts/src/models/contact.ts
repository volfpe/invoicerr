import mongoose from 'mongoose'

interface IContact extends mongoose.Document {
    name: string
    company: string
    street: string
    city: string
    country: string
    ic: string
    dic: string
    isActive: boolean
}

const ContactSchema = new mongoose.Schema({
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
    isActive: {
        type: Boolean,
        required: true,
    }
},
    { timestamps: true }
)

export default mongoose.model<IContact>('Contact', ContactSchema)