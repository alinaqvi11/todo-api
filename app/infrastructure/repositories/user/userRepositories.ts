import userEntity from "../../../domain/entities/userEntity";
import userModel from "../../database/model/userModel";
import userInterface from "../../../application/user/userInterface";
import Pagination from "../../../application/utils/pagination";
class UserRepository implements userInterface {
  async getUsers(pagination:Pagination): Promise<any> {
    return await userModel.findAll({
      limit: pagination.limit(),
      offset: pagination.offset(),
    });
  }
  async getUser(email: string): Promise<any> {
    return await userModel.findOne({
      where: {
        email: email,
      },
    });
  }
  
  async addUser(user: userEntity): Promise<any> {
    return await userModel.create(user);
  }
}

export default new UserRepository();
