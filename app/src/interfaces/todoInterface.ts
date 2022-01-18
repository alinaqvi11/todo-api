interface TodoInterface {
     getTodos(req:any,res:any) : any;
     getTodoById(req:any,res:any): any;
     addTodo(req:any,res:any): any;
     updateTodo(req:any,res:any): any;
     deleteTodo(req:any,res:any): any;
}

export default TodoInterface;
