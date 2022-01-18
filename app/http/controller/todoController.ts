import { v4 as uuidv4 } from "uuid";
import Todo from "../../infrastructure/model/todoModel";
import todoEntity from "../../domain/entities/todoEntity";
import TodoInterface from "../../src/interfaces/todoInterface";

class TodoController implements TodoInterface {
  getTodos(req: any, res: any) {
    throw new Error("Method not implemented.");
  }
  getTodoById(req: any, res: any) {
    throw new Error("Method not implemented.");
  }
  addTodo(req: any, res: any) {
    throw new Error("Method not implemented.");
  }
  updateTodo(req: any, res: any) {
    throw new Error("Method not implemented.");
  }
  deleteTodo(req: any, res: any) {
    throw new Error("Method not implemented.");
  }

  static getTodos = async (req: any, res: any) => {
    const todos = await Todo.findAll();
    const todo = todos.map((value: any) => {
      return todoEntity.createFromObject(value);
    });
    res.status(200).send(todo);
  };

  static getTodoById = async (req: any, res: any) => {
    try {
      const daoTodo = await Todo.findOne({
        where: {
          todoId: req.params.id,
        },
      });
      if (!daoTodo) {
        res.status(404).send({ message: "ID not exist" });
      } else {
        res.status(200).send(todoEntity.createFromObject(daoTodo));
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Internal Server Error" });
    }
  };

  static addTodo = async (req: any, res: any) => {
    try {
      const body = req.body;
      const userId = req.session.userId;
      const dtoTodo = todoEntity.createFromInput(userId, body);
      const daoTodo = await Todo.create(dtoTodo);
      const todo = todoEntity.createFromObject(daoTodo);
      res.status(200).send(todo);
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Internal Server Error" });
    }
  };

  static updateTodo = async (req: any, res: any) => {
    try {
      const body = req.body;
      const userId = req.session.userId;
      const dtoTodo = todoEntity.createFromInput(userId, body);
      dtoTodo.todoId = req.params.id;
      const daoTodo = await Todo.update(body, {
        where: {
          todoId: req.params.id,
          userId: req.session.userId,
        },
      });
      if (!daoTodo) {
        res.status(404).send({ message: "ID not exist" });
      } else {
        res.status(200).send({ message: "Updated Successfully" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Internal Server Error" });
    }
  };

  static deleteTodo = async (req: any, res: any) => {
    try {
      const daoTodo = await Todo.destroy({
        where: {
          todoId: req.params.id,
          userId: req.session.userId,
        },
      });

      if (!daoTodo) {
        res.status(404).send({ message: "ID not exist" });
      } else {
        res.status(200).send({ message: "Deleted Successfully" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Internal Server Error" });
    }
  };
}
export default TodoController;
