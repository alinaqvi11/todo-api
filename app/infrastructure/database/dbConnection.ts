import {Sequelize} from 'sequelize';
import db from '../config/index';
const sequelize = new Sequelize(db.DB, db.USER, db.PASSWORD, {
    dialect: db.DIALECT,
    host: db.HOST
});
sequelize.sync().then(result => {
    console.log('!!Database connected successfully!!');
}).catch(err => console.log(err));

export default sequelize;