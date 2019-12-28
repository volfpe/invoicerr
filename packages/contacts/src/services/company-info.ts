import CompanyInfoModel from '../models/company-info'

const CompanyInfoService = {
    editCompanyInfo: async (company: string, street: string, city: string, country: string, ic: string, dic: string) => {
        const info = new CompanyInfoModel({
            company,
            street,
            city,
            country,
            ic,
            dic,
        })
        return await info.save()
    },
    getCompanyInfo: async () => {
        const info = await CompanyInfoModel.find().sort({ createdAt: 'desc' }).limit(1)
        return info
    }
}

export default CompanyInfoService