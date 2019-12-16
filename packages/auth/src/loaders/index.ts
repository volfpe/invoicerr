import expressLoader from './express';
import { AuthService } from '../types'

export default async (app: AuthService) => {
//  const mongoConnection = await mongooseLoader();
//  console.log('MongoDB Intialized');
  await expressLoader(app);
  console.log('Express Intialized');
}