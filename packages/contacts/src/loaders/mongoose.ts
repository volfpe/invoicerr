import mongoose from 'mongoose'
import CompanyInfoModel from '../models/company-info'
import ContactModel from '../models/contact'
import CompanyInfoService from '../services/company-info'
import config from '../config'
import ContactService from '../services/contact'

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
    // if no info data is in database, create one
    const infoCount = await CompanyInfoModel.count({})
    if(infoCount === 0) {
        await CompanyInfoService.editCompanyInfo('company ltd.', 'street', 'town', 'country', '000', '002')
    }

    // if no contact is in database, create one
    const contactCount = await ContactModel.count({})
    if (contactCount === 0) {
        await ContactService.addContact('company 2 ltd.', 'street 2', 'town 2', 'country 2', '111', '112')
    }
}