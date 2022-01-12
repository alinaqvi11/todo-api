const Sequelize = require('sequelize')
const sequelize = require('../config/config')


const todo = sequelize.define('Todo',{
    todoId : {
        type : Sequelize.CHAR,
        allowNull: false,
        primaryKey: true
    },
    userId : {
        type : Sequelize.CHAR,
        allowNull: false,
    },
    name : {
        type : Sequelize.STRING,
        allowNull: false
    },
    description : {
        type : Sequelize.STRING,
        allowNull: false
    }
})

module.exports = todo;