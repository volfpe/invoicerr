import expressLoader from './express'
import mongooseLoader from './mongoose'
import { AuthService } from '../types'

export default async (app: AuthService) => {
  await mongooseLoader();
  console.log('MongoDB Intialized');
  await expressLoader(app);
  console.log('Express Intialized');
}