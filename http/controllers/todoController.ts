import todoService from "../../app/application/todo/todoServices";
import HttpResponse from "../../app/application/utils/httpResponse";
class TodoController {
   static getTodos = async (req: any, res: any) => {
    const todos:any = await todoService.getTodos(req);
    HttpResponse.convertToExpress(res, todos); 
  };

  static getTodoById = async (req: any, res: any) => {
    const todo:any = await todoService.getTodoById(req);
    HttpResponse.convertToExpress(res, todo); 
  };

  static addTodo = async (req: any, res: any) => {
    const todo:any = await todoService.addTodo(req);
    HttpResponse.convertToExpress(res, todo);
  };

  static updateTodo = async (req: any, res: any) => {
    const todo:any = await todoService.updateTodo(req);
    HttpResponse.convertToExpress(res, todo);
  };

  static deleteTodo = async (req: any, res: any) => {
    const todo: any = await todoService.deleteTodo(req);
    HttpResponse.convertToExpress(res, todo)
  };
}
export default TodoController;
