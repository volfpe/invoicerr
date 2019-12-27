import mongoose from 'mongoose'

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true,
    },
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

export default mongoose.model('Contact', ContactSchema)