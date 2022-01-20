import todoServices from "../../src/services/todo/todoServices";

class TodoController {
  static getTodos = async (req: any, res: any) => {
    const todos = await todoServices.getTodos();
    res.status(200).send(todos);
  };

  static getTodoById = async (req: any, res: any) => {
    const id: string = req.params.id;
    const todo = await todoServices.getTodoById(id);
    res.send(todo);
  };

  static addTodo = async (req: any, res: any) => {
    const todo = await todoServices.addTodo(req);
    res.send(todo);
  };

  static updateTodo = async (req: any, res: any) => {
    const todo = await todoServices.addTodo(req);
    res.send(todo);
  };

  static deleteTodo = async (req: any, res: any) => {
    const todo = await todoServices.deleteTodo(req);
    res.send(todo);
  };
}
export default TodoController;
