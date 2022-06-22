import userValidation from "../../domain/validation/userValidation";
import userEntity from "../../domain/entities/userEntity";
import {statusCode,respMessage} from "../utils/httpStatus";
import { v4 as uuidv4 } from "uuid";
import UserRepository from "../../infrastructure/repositories/user/userRepositories";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import Pagination from "../utils/pagination";
dotenv.config();
import HttpResponse from "../utils/httpResponse";

class UserService {
  static getUsers = async (req: any) => {
    try {
      const { size, page } = req.query;
      const pagination = new Pagination(parseInt(size), parseInt(page));
      const users: any = await UserRepository.getUsers(pagination);
      console.log(users)
      const user = users.map((value: any) => {
        return userEntity.createFromObject(value);
      });
      console.log(user,'123')
      return HttpResponse.create(statusCode.Ok, user);
    } catch (err) {
      console.log(err);
      return HttpResponse.create(statusCode.SERVER_ERROR, err);
    }
  };
  static getUser = async (req: any) => {
    try {
      const user: any = await UserRepository.getUser(req.body.email);
      if (user && user.password === req.body.password) {
        const token = jwt.sign({ id: user.id }, "alihaseeb");
        return HttpResponse.create(statusCode.Ok, respMessage.Success[3]);
      }
      if (!user) {
        return HttpResponse.create(statusCode.NOT_FOUND, respMessage.NOT_FOUND[1]);
      } else {
        return HttpResponse.create(statusCode.ERROR, respMessage.INVALID);
      }
    } catch (err) {
      console.log(err);
      return HttpResponse.create(statusCode.SERVER_ERROR, err);
    }
  };
  static addUser = async (req: any) => {
    try {
      const validationBody = userValidation.addUser(req);
      if (validationBody.fails()) {
        return HttpResponse.create(statusCode.ERROR, validationBody.errors.all());
      } else {
        const oneUser: any = await UserRepository.getUser(req.body.email);
        if (oneUser) {
          return HttpResponse.create(statusCode.ALREADY_TAKEN, respMessage.ALREADY_TAKEN);
        } else {
          const body = req.body;
          const id = uuidv4();
          const dtoUser = userEntity.createFromInput(id, body);
          const daoUser = await UserRepository.addUser(dtoUser);
          const token = jwt.sign({ id: daoUser.id }, "alihaseeb");
          return HttpResponse.create(statusCode.Ok, respMessage.Success[0]);
        }
      }
    } catch (err) {
      console.log(err);
      return HttpResponse.create(statusCode.SERVER_ERROR, err);
    }
  };
}
export default UserService;
