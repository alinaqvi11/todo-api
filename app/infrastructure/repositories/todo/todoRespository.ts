import todoModel from "../../database/model/todoModel";
import todoInterface from "../../../application/todo/todoServices";
import todoEntity from "../../../domain/entities/todoEntity";
import Pagination from "../../../application/utils/pagination";

class TodoRepository implements todoInterface {
  async getTodos(pagination: Pagination): Promise<any> {
    return todoModel.findAll({
      limit: pagination.limit(),
      offset: pagination.offset(),
    });
  }

  async getTodoById(id: string,userId:string): Promise<any> {
    return await todoModel.findOne({
      where: {
        todoId: id,
        userId: userId,
      },
    });
  }
  async addTodo(todo: todoEntity) {
    return await todoModel.create(todo);
  }
  async updateTodo(todo: todoEntity) {
    return await todoModel.update(
      {
        name: todo.name,
        description: todo.description,
      },
      {
        where: {
          todoId: todo.todoId,
          userId: todo.userId,
        },
      }
    );
  }
  async deleteTodo(todoId: any, userId: any) {
    return await todoModel.destroy({
      where: {
        todoId: todoId,
        userId: userId,
      },
    });
  }
}

export default new TodoRepository();
