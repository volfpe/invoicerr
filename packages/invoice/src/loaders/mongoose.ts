import mongoose from 'mongoose'
import config from '../config'
import InvoiceModel from '../models/invoice'
import invoice from '../models/invoice'
import InvoiceService from '../services/invoice'

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

    // if no invoice is in database, create one
    const invoiceCount = await InvoiceModel.count({})
    if (invoiceCount === 0) {
        await InvoiceService.createInvoice([{name: 'item1', quantity: 2, pricePerItem: 10}, {name: 'item2', quantity: 1, pricePerItem: 6}],
            {  
                company: 'company2 ltd.',
                street: 'street 2',
                city: 'city 2',
                country: 'country 2',
                dic: '222',
                ic: '111',
            }, {
                company: 'company ltd.',
                street: 'street',
                city: 'city',
                country: 'country',
                dic: '999',
                ic: '998'
            })
    }
}