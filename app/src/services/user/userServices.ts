import User from "../../../infrastructure/model/userModel";
import userValidation from "./validation/userValidation";
import userEntity from "../../../domain/entities/userEntity";
import userInterface from "./userInterface";
import {statusCode,message} from '../../services/utils/messages'

class UserServices implements userInterface {
  getUsers() {
    throw new Error("Method not implemented.");
  }
  logInUser(req: any) {
    throw new Error("Method not implemented.");
  }
  addUser(req: any) {
    throw new Error("Method not implemented.");
  }
  
  static getUsers = async () => {
    try {
      const users = await User.findAll();
      const user = users.map((value: any) => {
        return userEntity.createFromObject(value);
      });
      return user;
    } catch (err) {
      console.log(err);
      return {message: message.SERVER_ERROR,statusCode: statusCode.SERVER_ERROR};
    }
  };
  static logInUser = async (req : any) => {
  try {
    const user:any = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
   if (user && user.password === req.body.password) {
      req.session.userId = user.id;
      return {message : message.SUCCESS[3], statusCode : statusCode.SUCCESS};
      } 
    if (!user){
      return {message : message.NOT_EMAIL, statusCode : statusCode.NOT_FOUND};
    }
  else{
    return {message : message.INVALID, statusCode : statusCode.NOT_FOUND};
      }
  }catch (err) {
    console.log(err);
    return {message: message.SERVER_ERROR,statusCode: statusCode.SERVER_ERROR};
  }
};
static addUser = async (req : any) => {
    try {
      const validationBody = userValidation.addUser(req);
      if (validationBody.fails()) {
        return validationBody.errors.all();
      } else {
        const oneUser = await User.findOne({
          where: {
            email: req.body.email,
          },
        });
        if (oneUser) {
         return {message : message.ALREADY_TAKEN,statusCode : statusCode.NOT_FOUND};
        } else {
          const body = req.body;
          const dtoUser = userEntity.createFromInput(body);
          const daoUser = await User.create(dtoUser);
          return {message : message.SUCCESS[0],statusCode : statusCode.SUCCESS};
        }
      }
    } catch (err) {
      console.log(err);
      return {message: message.SERVER_ERROR,statusCode: statusCode.SERVER_ERROR};
    }
  };



}
export default UserServices;
