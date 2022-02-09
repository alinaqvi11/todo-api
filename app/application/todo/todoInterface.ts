import todoEntity from "../../domain/entities/todoEntity";
import Pagination from "../utils/pagination";

interface TodoInterface {
    getTodos(pagination : Pagination) : Promise<any>;
    getTodoById(id : string) :  Promise<any>;
    addTodo(todo: todoEntity) : Promise<any>;
    updateTodo(todo: todoEntity) : Promise<any>;
    deleteTodo(todoId: any, userId: any) : Promise<any>;
    }
    
    export default TodoInterface;