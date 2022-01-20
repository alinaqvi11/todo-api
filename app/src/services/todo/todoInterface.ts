interface TodoInterface {
getTodos() : any;
getTodoById(id : string) : any;
addTodo(req :any) : any;
updateTodo(req:any) : any;
deleteTodo(req:any) : any
}

export default TodoInterface;