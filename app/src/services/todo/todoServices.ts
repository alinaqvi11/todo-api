import todoEntity from "../../../domain/entities/todoEntity";
import Todo from "../../../infrastructure/model/todoModel";
import todoInterface from "./todoInterface";
import {statusCode,message} from '../../services/utils/messages'
import { v4 as uuidv4 } from 'uuid';

class TodoServices implements todoInterface {
  getTodos() {
    throw new Error("Method not implemented.");
  }
  getTodoById(id: string) {
    throw new Error("Method not implemented.");
  }
  addTodo(req: any) {
    throw new Error("Method not implemented.");
  }
  updateTodo(req: any) {
    throw new Error("Method not implemented.");
  }
  deleteTodo(req: any) {
    throw new Error("Method not implemented.");
  }

 
  static getTodos = async () => {
    try {
      const todos = await Todo.findAll();
      const todo = todos.map((value: any) => {
        return todoEntity.createFromObject(value);
      });
      return todo;
    } catch (err) {
      console.log(err);
      return {message: message.SERVER_ERROR,statusCode: statusCode.SERVER_ERROR};
    }
  };
  static getTodoById = async (id:string) => {
    try {
      const todo = await Todo.findOne({
        where: {
          todoId: id,
        },
      });
      if (!todo) {
        return {message : message.NOT_FOUND,statusCode : statusCode.NOT_FOUND};
      } else return todoEntity.createFromObject(todo);
    } catch (err) {
      console.log(err);
      return {message: message.SERVER_ERROR,statusCode: statusCode.SERVER_ERROR};
    }
  };
  static addTodo = async (req:any) => {
    try {  
      const body = req.body;
      const userId:string = req.session.userId; 
      const todoId = uuidv4();  
      const dtoTodo:any = todoEntity.createFromInput(todoId,userId,body);
      const daoTodo = await Todo.create(dtoTodo);
      return {message : message.SUCCESS[0], statusCode : statusCode.SUCCESS}; 
    } catch (err) {
      console.log(err);
      return {message: message.SERVER_ERROR,statusCode: statusCode.SERVER_ERROR};
    }
  };
  static updateTodo = async (req:any) => {
    try {    
      const body = req.body;
      const userId = req.session.userId;
      const todoId = req.params.id;
      const dtoTodo = todoEntity.createFromInput(todoId,userId,body);       
      const daoTodo = await Todo.update(body,{
        where: {
          todoId: req.params.id,
          userId: req.session.userId,
        },
      });      
      if (!daoTodo) {
        return {message : message.NOT_FOUND,statusCode : statusCode.NOT_FOUND};
      } else return {message : message.SUCCESS[2], statusCode : statusCode.SUCCESS};  
    } catch (err) {
      console.log(err);
      return {message: message.SERVER_ERROR,statusCode: statusCode.SERVER_ERROR};
    }
  };
  static deleteTodo = async (req: any) => {
    try {
      const todo = await Todo.destroy({
        where: {
          todoId: req.params.id,
          userId: req.session.userId,
        },
      });
      if (!todo) {
        return {message : message.NOT_FOUND, statusCode : statusCode.NOT_FOUND};
      } else return {message : message.SUCCESS[1], statusCode : statusCode.SUCCESS};  
    } catch (err) {
      console.log(err);
      return {message: message.SERVER_ERROR,statusCode: statusCode.SERVER_ERROR};
    }
  };
}

export default TodoServices;
