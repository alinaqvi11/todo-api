import { Sequelize } from 'sequelize';
import db from '../config/index';
import logger from '../logger/logger'
const sequelize = new Sequelize(db.DB, db.USER, db.PASSWORD, {
    dialect: db.DIALECT,
    host: db.HOST
});
sequelize.sync().then(result => {
    logger.info('!!Database connected successfully!!');
}).catch(err => console.log(err));

export default sequelize;