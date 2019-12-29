import mongoose from 'mongoose'
import CompanyInfoModel from '../models/company-info'
import CompanyInfoService from '../services/company-info'
import config from '../config'

const wait = (ms: number) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(ms)
      }, ms )
    })
}

const connectWithRetry = (url: string) => {
    return new Promise(async (resolve) => {
        while (true) {
            try {
                await mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true })
                resolve()
                return
            } catch(e) {
                console.log('mongo connect failed, retry in 5s')
                await wait(5000)
            }
        }
    })
  };

export default async () => {
    await connectWithRetry(config.database.url)
    // if no user is in database, create default admin
    const infoCount = await CompanyInfoModel.count({})
    if(infoCount === 0) {
        await CompanyInfoService.editCompanyInfo('company s.r.o.', 'ulice', 'mesto', 'zeme', '000', '000')
    }
}