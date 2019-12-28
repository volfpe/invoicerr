import mongoose from 'mongoose'

interface ICompanyInfo extends mongoose.Document {
    company: string
    street: string
    city: string
    country: string
    ic: string
    dic: string
}

const CompanyInfoSchema = new mongoose.Schema({
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
},
    { timestamps: true }
)

export default mongoose.model<ICompanyInfo>('company-info', CompanyInfoSchema)