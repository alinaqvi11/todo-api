import { v4 as uuidv4 } from 'uuid';

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
  static createFromInput = (userId:string,body:any) => {
    const todoId = uuidv4();
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
      obj.description
    );    
  };
}
export default TodoEntity;
