import { Router } from 'express'
import publicApi from './routes/public'
import internalApi from './routes/internal'

export default () => {
	const app = Router()
	publicApi(app);
	internalApi(app);

	return app
}