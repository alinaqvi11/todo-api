import userValidation from "./validation/userValidation";
import userEntity from "../../../domain/entities/userEntity";
import { statusCode, message } from "../../services/utils/messages";
import { v4 as uuidv4 } from "uuid";
import UserRepository from "../../../infrastructure/repositories/user/userRepositories";
import MyAppError from "../../../http/errors/myAppError";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

class UserServices {
  static getUsers = async (req: any) => {
    try {
      const size = parseInt(req.query.size);
      const page = parseInt(req.query.page);
      const users: any = await UserRepository.getUsers(size, page);
      const user = users.map((value: any) => {
        return userEntity.createFromObject(value);
      });
      return { statusCode: statusCode.SUCCESS, data: user };
    } catch (err) {
      console.log(err);
      return new MyAppError(statusCode.SERVER_ERROR, message.SERVER_ERROR);
    }
  };
  static getUser = async (req: any) => {
    try {
      const user: any = await UserRepository.getUser(req.body.email);
      if (user && user.password === req.body.password) {
        const token = jwt.sign({ id: user.id }, "alihaseeb");

        return { statusCode: statusCode.SUCCESS, message: message.SUCCESS[3] };
      }
      if (!user) {
        return new MyAppError(statusCode.UNAUTHORIZED, message.NOT_EMAIL);
      } else {
        return new MyAppError(statusCode.UNAUTHORIZED, message.INVALID);
      }
    } catch (err) {
      console.log(err);
      return new MyAppError(statusCode.SERVER_ERROR, message.SERVER_ERROR);
    }
  };
  static addUser = async (req: any) => {
    try {
      const validationBody = userValidation.addUser(req);
      if (validationBody.fails()) {
        return {
          statusCode: statusCode.UNAUTHORIZED,
          errors: validationBody.errors.all(),
        };
      } else {
        const oneUser: any = await UserRepository.getUser(req.body.email);
        if (oneUser) {
          return {
            statusCode: statusCode.SUCCESS,
            message: message.ALREADY_TAKEN,
          };
        } else {
          const body = req.body;
          const id = uuidv4();
          const dtoUser = userEntity.createFromInput(id, body);
          const daoUser = await UserRepository.addUser(dtoUser);
          const token = jwt.sign({ id: daoUser.id }, "alihaseeb");
          return {
            statusCode: statusCode.CREATED,
            message: message.SUCCESS[0],
            Token: token,
          };
        }
      }
    } catch (err) {
      console.log(err);
      return new MyAppError(statusCode.SERVER_ERROR, message.SERVER_ERROR);
    }
  };
}
export default UserServices;
