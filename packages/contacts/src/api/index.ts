import { Router } from 'express'
import publicApi from './routes/public'

export default () => {
	const app = Router()
	publicApi(app);
	// internalApi(app);

	return app
}