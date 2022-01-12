const express = require('express')
const router = express.Router()
const auth = require('../middlwares/auth')
const todoController = require('../controller/todoController')

router.get('/todo',auth,todoController.getTodos)
router.get('/todo/:id',auth,todoController.getTodoById)
router.delete('/todo/:id',auth,todoController.deleteTodo)
router.put('/todo/:id',auth,todoController.updateTodo)
router.post('/todo',auth,todoController.addTodo)
module.exports = router;
