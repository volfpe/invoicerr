import mongoose from 'mongoose'
import CompanyInfoModel from '../models/company-info'
import CompanyInfoService from '../services/company-info'
import config from '../config'

export default async () => {
    await mongoose.connect(config.database.url, { useNewUrlParser: true, useCreateIndex: true });
    // if no user is in database, create default admin
    const infoCount = await CompanyInfoModel.count({})
    if(infoCount === 0) {
        await CompanyInfoService.editCompanyInfo('company s.r.o.', 'ulice', 'mesto', 'zeme', '000', '000')
    }
}