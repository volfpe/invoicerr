import { Router } from 'express'
import publicApi from './routes/public'
import internalApi from './routes/internal'

export default () => {
	const app = Router()
	// register public endpoints
	publicApi(app);
	// register internal endpoints
	internalApi(app);

	return app
}