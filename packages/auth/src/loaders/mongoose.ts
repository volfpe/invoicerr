import mongoose from 'mongoose'
import config from '../config'
import AuthModel from '../models/auth'
import authService from '../services/auth'

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
                console.log(url)
                console.log('mongo connect failed, retry in 5s ', e)
                await wait(5000)
            }
        }
    })
  };

export default async () => {
    await connectWithRetry(config.database.url)
    // if no user is in database, create default admin
    const usersCount = await AuthModel.count({})

    // intiailize user db if document is empty
    if(usersCount === 0) {
        await authService.addUser('Admin001', '1234', 'admin')
        await authService.addUser('User0001', '0001', 'accountant')
        await authService.addUser('User0002', '0002', 'accountant')
        await authService.addUser('User0003', '0003', 'user')
    }
}