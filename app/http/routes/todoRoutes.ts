import  express  from "express"
const router = express.Router()
import auth from '../middlwares/auth'
import todoController from "../controller/todoController"


router.get('/todo',auth,todoController.getTodos)
router.get('/todo/:id',auth,todoController.getTodoById)
router.delete('/todo/:id',auth,todoController.deleteTodo)
router.put('/todo/:id',auth,todoController.updateTodo)
router.post('/todo',auth,todoController.addTodo)

export default router;
