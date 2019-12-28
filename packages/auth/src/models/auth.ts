import mongoose from 'mongoose'

export type IRoles = 'user' | 'accountant' | 'admin'

interface IAuth extends mongoose.Document {
    username: string
    password: string
    role: IRoles
    isActive: string
}

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

export default mongoose.model<IAuth>('Auth', AuthSchema)