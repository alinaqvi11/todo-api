import todoEntity from "../../../domain/entities/todoEntity";
import { statusCode, message } from '../../services/utils/messages'
import { v4 as uuidv4 } from 'uuid';
import TodoRepository from "../../../infrastructure/repositories/todo/todoRespository";
import MyAppError from "../../../http/errors/myAppError";

class TodoServices {

  static getTodos = async (req: any) => {
    try {
      const size = parseInt(req.query.size);
      const page = parseInt(req.query.page);
      const todos = await TodoRepository.getTodos(size, page);
      const todo = todos.map((value: any) => {
        return todoEntity.createFromObject(value);
      });
      return new MyAppError(statusCode.SUCCESS, todo);
    } catch (err) {
      console.log(err);
      return new MyAppError(statusCode.SERVER_ERROR, message.SERVER_ERROR);
    }
  };
  static getTodoById = async (req: any) => {
    try {
      const id: string = req.params.id;
      const todo = await TodoRepository.getTodoById(id);
      if (!todo) {
        return new MyAppError(statusCode.NOT_FOUND, message.NOT_FOUND);
      } else return new MyAppError(statusCode.SUCCESS, todoEntity.createFromObject(todo));
    } catch (err) {
      console.log(err);
      return new MyAppError(statusCode.SERVER_ERROR, message.SERVER_ERROR);
    }
  };
  static addTodo = async (req: any) => {
    try {
      const body = req.body;
      const userId: string = req.session.userId;
      const todoId = uuidv4();
      const dtoTodo = todoEntity.createFromInput(todoId, userId, body);
      const daoTodo = await TodoRepository.addTodo(dtoTodo)
      return new MyAppError(statusCode.CREATED, message.SUCCESS[0]);
    } catch (err) {
      console.log(err);
      return new MyAppError(statusCode.SERVER_ERROR, message.SERVER_ERROR);
    }
  };
<<<<<<< HEAD
  async updateTodo(req: any): Promise<any> {
    try {
=======
  static updateTodo = async (req:any) => {
    try {
>>>>>>> refactor-phase2
      const body = req.body;
      const userId = req.session.userId;
      const todoId = req.params.id;
      const dtoTodo = todoEntity.createFromInput(todoId, userId, body);
      const daoTodo = await TodoRepository.updateTodo(dtoTodo);
      if (!daoTodo) {
        return new MyAppError(statusCode.NOT_FOUND, message.NOT_FOUND);
      } else return new MyAppError(statusCode.SUCCESS, message.SUCCESS[2]);
    } catch (err) {
      console.log(err);
      return new MyAppError(statusCode.SERVER_ERROR, message.SERVER_ERROR);
    }
  };
  static deleteTodo = async (req: any) => {
    try {
      const todo = await TodoRepository.deleteTodo(req.params.id, req.session.userId)
      if (!todo) {
        return new MyAppError(statusCode.NOT_FOUND, message.NOT_FOUND);
      } else return new MyAppError(statusCode.SUCCESS, message.SUCCESS[1]);
    } catch (err) {
      console.log(err);
      return new MyAppError(statusCode.SERVER_ERROR, message.SERVER_ERROR);
    }
  };
}

<<<<<<< HEAD
<<<<<<< HEAD
export default TodoServices;
=======
export default new TodoServices();
>>>>>>> refactor-phase1
=======
export default TodoServices;
>>>>>>> refactor-phase2
