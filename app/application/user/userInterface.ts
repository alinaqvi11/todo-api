import userEntity from "../../domain/entities/userEntity";
import Pagination from "../utils/pagination";

interface UserInterface {
    getUsers(pagination:Pagination) : Promise<any>;
    getUser(email:string) : Promise<any>;
    addUser(user:userEntity) : Promise<any>;
}

export default UserInterface;