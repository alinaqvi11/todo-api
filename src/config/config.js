const Sequelize = require('sequelize')
const sequelize = new Sequelize("todoapp", "root", "ali123", {
    dialect: "mysql",
    host: "localhost"
});
sequelize.sync().then(result => {
    console.log('!!Database connected successfully!!');
}).catch(err => console.log(err));

module.exports = sequelize;