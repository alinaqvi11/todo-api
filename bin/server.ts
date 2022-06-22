import app from './app';
import db from '../app/infrastructure/database/dbConnection'
import * as dotenv from 'dotenv';
dotenv.config();
import logger from '../app/infrastructure/logger/logger'
const port = process.env.PORT || 3000;
app.listen(port, () => {
    logger.info(`!! Running on port ${port} !!`)
})