import todoServices from "../../src/services/todo/todoServices";

class TodoController {
  static getTodos = async (req: any, res: any) => {
    const todos: any = await todoServices.getTodos(req);
    res.status(todos.statusCode).send(todos);
  };

  static getTodoById = async (req: any, res: any) => {
    const todo: any = await todoServices.getTodoById(req);
    res.status(todo.statusCode).send(todo);
  };

  static addTodo = async (req: any, res: any) => {
    const todo: any = await todoServices.addTodo(req);
    res.status(todo.statusCode).send(todo);
  };

  static updateTodo = async (req: any, res: any) => {
    const todo: any = await todoServices.updateTodo(req);
    res.status(todo.statusCode).send(todo);
  };

  static deleteTodo = async (req: any, res: any) => {
    const todo: any = await todoServices.deleteTodo(req);
    res.status(todo.statusCode).send(todo);
  };
}
export default TodoController;
