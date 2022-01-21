import todoServices from "../../src/services/todo/todoServices";

class TodoController {
  static getTodos = async (req: any, res: any) => {
    const todos = await todoServices.getTodos();
    res.status(200).send(todos);
  };

  static getTodoById = async (req: any, res: any) => {
    const id: string = req.params.id;
    const todo:any = await todoServices.getTodoById(id);
    res.status(200).send(todo);
  };

  static addTodo = async (req: any, res: any) => {
    const todo:any = await todoServices.addTodo(req);
    res.status(todo.statusCode).send(todo);
  };

  static updateTodo = async (req: any, res: any) => {
    const todo:any = await todoServices.updateTodo(req);
    res.status(todo.statusCode).send(todo);
  };

  static deleteTodo = async (req: any, res: any) => {
    const todo: any = await todoServices.deleteTodo(req);
    res.status(todo.statusCode).send(todo);
  };
}
export default TodoController;
