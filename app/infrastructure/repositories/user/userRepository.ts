import UserEntity from "../../../domain/entities/userEntity";
import User from "../../database/model/userModel";
import UserInterface from "../../../src/services/user/userInterface";

class UserRepository implements UserInterface {
  async getUsers(size: number, page: number): Promise<any> {
    return await User.findAll({
      limit: size,
      offset: page * size,
    });
  }
  async getUser(email: string): Promise<any> {
    return await User.findOne({
      where: {
        email: email,
      },
    });
  }
  async addUser(user: UserEntity): Promise<any> {
    return await User.create(user);
  }
}

export default new UserRepository();
