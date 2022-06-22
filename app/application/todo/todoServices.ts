import todoEntity from "../../domain/entities/todoEntity";
import { v4 as uuidv4 } from "uuid";
import TodoRepository from "../../infrastructure/repositories/todo/todoRespository";
import Pagination from "../utils/pagination";
import HttpResponse from "../utils/httpResponse";
import {statusCode,respMessage} from "../utils/httpStatus";
class TodoService {
  static getTodos = async (req: any) => {
    try {
      const { size, page } = req.query;
      const pagination = new Pagination(parseInt(size), parseInt(page));
      const todos = await TodoRepository.getTodos(pagination);
      const todo = todos.map((value: any) => {
        return todoEntity.createFromObject(value);
      });
      return HttpResponse.create(statusCode.Ok, todo);
    } catch (err) {
      console.log(err);
      return HttpResponse.create(statusCode.SERVER_ERROR, err);
    }
  };
  static getTodoById = async (req: any) => {
    try {
      const id: string = req.params.id;
      const todo = await TodoRepository.getTodoById(id);
      if (!todo) {
        return HttpResponse.create(statusCode.NOT_FOUND, respMessage.NOT_FOUND[0]); 
      } else
      return HttpResponse.create(statusCode.Ok, todo);
    } catch (err) {
      console.log(err);
      return HttpResponse.create(statusCode.SERVER_ERROR, err);
    }
  };
  static addTodo = async (req: any) => {
    try {
      const body = req.body;
      const todoId = uuidv4();
      const dtoTodo = todoEntity.createFromInput(todoId, body);
      const daoTodo = await TodoRepository.addTodo(dtoTodo);
      return HttpResponse.create(statusCode.Ok, respMessage.Success[0]);
    } catch (err) {
      console.log(err);
      return HttpResponse.create(statusCode.SERVER_ERROR, err);
    }
  };
  static updateTodo = async (req: any) => {
    try {
      const body = req.body;
      const todoId = req.params.id;
      const dtoTodo = todoEntity.createFromInput(todoId, body);
      const daoTodo = await TodoRepository.updateTodo(dtoTodo);
      if (!daoTodo) {
        return HttpResponse.create(statusCode.NOT_FOUND, respMessage.NOT_FOUND[0]);
      } else
      return HttpResponse.create(statusCode.Ok, respMessage.Success[2]);
    } catch (err) {
      console.log(err);
      return HttpResponse.create(statusCode.SERVER_ERROR, err);
    }
  };
  static deleteTodo = async (req: any) => {
    try {
      const todo = await TodoRepository.deleteTodo(
        req.params.id,
        req.body.userId
      );
      if (!todo) {
        return HttpResponse.create(statusCode.NOT_FOUND, respMessage.NOT_FOUND[0]);
      } else
      return HttpResponse.create(statusCode.Ok, respMessage.Success[1]);
    } catch (err) {
      console.log(err);
      return HttpResponse.create(statusCode.SERVER_ERROR, err);
    }
  };
}

export default TodoService;
