import mongoose from 'mongoose'

const AuthSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
    }
},
    { timestamps: true }
)

export default mongoose.model('Auth', AuthSchema)