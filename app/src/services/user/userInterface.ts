import UserEntity from "../../../domain/entities/userEntity";

interface UserInterface {
    getUsers(size: number, page: number): Promise<any>;
    getUser(email: string): Promise<any>;
    addUser(user: UserEntity): Promise<any>;
}

export default UserInterface;
