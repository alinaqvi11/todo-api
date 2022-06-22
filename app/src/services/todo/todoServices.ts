import todoEntity from "../../../domain/entities/todoEntity";
import { statusCode, message } from "../../services/utils/messages";
import { v4 as uuidv4 } from "uuid";
import Todo from "../../../infrastructure/database/model/todoModel";
import TodoInterface from "./todoInterface";
class TodoServices implements TodoInterface {
  async getTodos(): Promise<any> {
    try {
      const todos = await Todo.findAll();
      const todo = todos.map((value: any) => {
        return todoEntity.createFromObject(value);
      });
      return { statusCode: statusCode.SUCCESS, message: todo };
    } catch (err) {
      console.log(err);
      return {
        statusCode: statusCode.SERVER_ERROR,
        message: message.SERVER_ERROR,
      };
    }
  };
  async getTodoById(req: any): Promise<any> {
    try {
      const todoId: string = req.params.id;
      const todo = await Todo.findOne({
        where: {
          todoId: todoId,
        },
      });
      if (!todo) {
        return { statusCode: statusCode.NOT_FOUND, message: message.NOT_FOUND };
      } else
        return {
          statusCode: statusCode.SUCCESS,
          message: todoEntity.createFromObject(todo),
        };
    } catch (err) {
      console.log(err);
      return {
        statusCode: statusCode.SERVER_ERROR,
        message: message.SERVER_ERROR,
      };
    }
  };
  async addTodo(req: any): Promise<any> {
    try {
      const body = req.body;
      const userId: string = req.session.userId;
      const todoId = uuidv4();
      const dtoTodo = todoEntity.createFromInput(todoId, userId, body);
      const daoTodo = await Todo.create(dtoTodo);
      return { statusCode: statusCode.CREATED, message: message.SUCCESS[0] };
    } catch (err) {
      console.log(err);
      return {
        statusCode: statusCode.SERVER_ERROR,
        message: message.SERVER_ERROR,
      };
    }
  };
  async updateTodo(req: any): Promise<any> {
    try {
      const body = req.body;
      const userId = req.session.userId;
      const todoId = req.params.id;
      const dtoTodo = todoEntity.createFromInput(todoId, userId, body);
      const daoTodo = await Todo.update(
        {
          name: dtoTodo.name,
          description: dtoTodo.description,
        },
        {
          where: {
            todoId: dtoTodo.todoId,
            userId: dtoTodo.userId,
          },
        }
      );
      if (!daoTodo) {
        return { statusCode: statusCode.NOT_FOUND, message: message.NOT_FOUND };
      } else
        return { statusCode: statusCode.SUCCESS, message: message.SUCCESS[2] };
    } catch (err) {
      console.log(err);
      return {
        statusCode: statusCode.SERVER_ERROR,
        message: message.SERVER_ERROR,
      };
    }
  };
  async deleteTodo(req: any): Promise<any> {
    try {
      const todo = await Todo.destroy({
        where: {
          todoId: req.params.id,
          userId: req.session.userId,
        },
      });
      if (!todo) {
        return { statusCode: statusCode.NOT_FOUND, message: message.NOT_FOUND };
      } else
        return { statusCode: statusCode.SUCCESS, message: message.SUCCESS[1] };
    } catch (err) {
      console.log(err);
      return {
        statusCode: statusCode.SERVER_ERROR,
        message: message.SERVER_ERROR,
      };
    }
  };
}

<<<<<<< HEAD
export default TodoServices;
=======
export default new TodoServices();
>>>>>>> refactor-phase1
