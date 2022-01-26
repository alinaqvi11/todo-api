import Todo from "../../database/model/todoModel";
import TodoInterface from "../../../src/services/todo/todoInterface";
import TodoEntity from "../../../domain/entities/todoEntity";
class TodoRepository implements TodoInterface {
   async getTodos (size: number, page: number): Promise<any> {
    return Todo.findAll({
      limit: size,
      offset : page * size,
    })
  };

  async getTodoById(id: string) : Promise<any> {
    return await Todo.findOne({
      where: {
        todoId: id,
      },
    });
  }
  async  addTodo(todo: TodoEntity) {
    return await Todo.create(todo);
  }
  async updateTodo(todo: TodoEntity) {
    return await Todo.update({
      name : todo.name,
      description : todo.description, 
    }, {
      where: {
        todoId: todo.todoId,
        userId: todo.userId,
      },
    });
  }
  async deleteTodo(todoId: any, userId: any) {
    return await Todo.destroy({
      where: {
        todoId: todoId,
        userId: userId,
      },
    });
  }
}
  
  


export default new TodoRepository();


