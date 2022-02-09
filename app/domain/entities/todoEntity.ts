class TodoEntity {
  todoId: string;
  userId : string;
  name: string;
  description: string;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
  
  constructor(todoId:string,userId:string,name:string, description:string) {
    this.todoId = todoId;
    this.userId = userId;
    this.name = name;
    this.description = description;
  }
  static createFromInput = (todoId:string,body:any) => {
    const todo = new TodoEntity(
        todoId, 
        body.userId, 
        body.name, 
        body.description,
    );
    todo.createdAt = new Date();
    todo.updatedAt = new Date();
    return todo;
  };
  static createFromObject = (obj:any) => {
    const todo = new TodoEntity(
      obj.todoId,
      obj.userId,
      obj.name,
      obj.description,
    );
    todo.createdAt = obj.createdAt;
    todo.updatedAt = obj.updatedAt;
    return todo;
  };
}
export default TodoEntity;
