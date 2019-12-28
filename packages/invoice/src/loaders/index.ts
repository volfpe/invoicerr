import expressLoader from './express'
import mongooseLoader from './mongoose'
import { InvoiceService } from '../types'

export default async (app: InvoiceService) => {
  await mongooseLoader();
  console.log('MongoDB Intialized');
  await expressLoader(app);
  console.log('Express Intialized');
}