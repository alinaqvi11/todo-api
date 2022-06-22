import userValidation from "./validation/userValidation";
import userEntity from "../../../domain/entities/userEntity";
import { statusCode, message } from '../../services/utils/messages'
import { v4 as uuidv4 } from 'uuid';
import UserRepository from "../../../infrastructure/repositories/user/userRepositories";
import MyAppError from "../../../http/errors/myAppError";

class UserServices {

  static getUsers = async (req: any) => {
    try {
      const size = parseInt(req.query.size);
      const page = parseInt(req.query.page);
      const users: any = await UserRepository.getUsers(size, page);
      const user = users.map((value: any) => {
        return userEntity.createFromObject(value);
      });
      return new MyAppError(statusCode.SUCCESS, user);
    } catch (err) {
      console.log(err);
      return new MyAppError(statusCode.SERVER_ERROR, message.SERVER_ERROR,);
    }
  };
<<<<<<< HEAD
  async getUser(req: any): Promise<any> {
    try {
      const user: any = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (user && user.password === req.body.password) {
        req.session.userId = user.id;
        return { statusCode: statusCode.SUCCESS, message: message.SUCCESS[3] };
      }
      if (!user) {
        return {
          statusCode: statusCode.UNAUTHORIZED,
          message: message.NOT_EMAIL,
        };
      } else {
        return {
          statusCode: statusCode.UNAUTHORIZED,
          message: message.INVALID,
        };
      }
    } catch (err) {
      console.log(err);
      return {
        statusCode: statusCode.SERVER_ERROR,
        message: message.SERVER_ERROR,
      };
    }
  };
  async addUser(req: any): Promise<any> {
=======
  static getUser = async (req : any) => {
  try {
    const user:any = await UserRepository.getUser(req.body.email)
   if (user && user.password === req.body.password) {
      req.session.userId = user.id;
      return new MyAppError(statusCode.SUCCESS,message.SUCCESS[3],);
      }
    if (!user){
      return new MyAppError(statusCode.UNAUTHORIZED,message.NOT_EMAIL);
    }
  else{
    return new MyAppError(statusCode.UNAUTHORIZED,message.INVALID);
      }
  }catch (err) {
    console.log(err);
    return new MyAppError(statusCode.SERVER_ERROR,message.SERVER_ERROR);;
  }
};
static addUser = async (req : any) => {
>>>>>>> refactor-phase2
    try {
      const validationBody = userValidation.addUser(req);
      if (validationBody.fails()) {
        return { statusCode: statusCode.UNAUTHORIZED, errors: validationBody.errors.all() };
      } else {
        const oneUser: any = await UserRepository.getUser(req.body.email)
        if (oneUser) {
          return new MyAppError(statusCode.SUCCESS, message.ALREADY_TAKEN,);
        } else {
          const body = req.body;
          const id = uuidv4();
          const dtoUser = userEntity.createFromInput(id, body);
          const daoUser = await UserRepository.addUser(dtoUser);
          return new MyAppError(statusCode.CREATED, message.SUCCESS[0]);
        }
      }
    } catch (err) {
      console.log(err);
<<<<<<< HEAD
<<<<<<< HEAD
      return new MyAppError(statusCode.SERVER_ERROR, message.SERVER_ERROR);
    }
  };



}
export default UserServices;
=======
      return {
        statusCode: statusCode.SERVER_ERROR,
        message: message.SERVER_ERROR,
      };
=======
      return new MyAppError(statusCode.SERVER_ERROR,message.SERVER_ERROR);
>>>>>>> refactor-phase2
    }
  };



}
<<<<<<< HEAD
export default new UserServices();
>>>>>>> refactor-phase1
=======
export default UserServices;
>>>>>>> refactor-phase2
