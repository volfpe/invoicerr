import mongoose from 'mongoose'
import config from '../config'
import AuthModel from '../models/auth'
import authService from '../services/auth';

export default async () => {
    await mongoose.connect(config.database.url, { useNewUrlParser: true, useCreateIndex: true });
    // if no user is in database, create default admin
    const usersCount = await AuthModel.count({})
    if(usersCount === 0) {
        await authService.addUser('admin', 'admin', 'admin')
    }
}