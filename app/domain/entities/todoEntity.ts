class TodoEntity {

  todoId: string;
  userId : string;
  name: string;
  description: string;
  

  constructor(todoId:string,userId:string,name:string, description:string) {
    this.todoId = todoId;
    this.userId = userId;
    this.name = name;
    this.description = description;
  }
  static createFromInput = (todoId:string,userId:string,body:any) => {
    return new TodoEntity(
        todoId, 
        userId, 
        body.name, 
        body.description        
    );
  };
  static createFromObject = (obj:any) => {
    return new TodoEntity(
      obj.todoId,
      obj.userId,
      obj.name,
      obj.description,
    );
  };
}
export default TodoEntity;
