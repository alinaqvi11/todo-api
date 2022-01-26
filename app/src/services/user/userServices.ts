import userValidation from "./validation/userValidation";
import userEntity from "../../../domain/entities/userEntity";
import {statusCode,message} from '../../services/utils/messages'
import { v4 as uuidv4 } from 'uuid';
import User from "../../../infrastructure/database/model/userModel";


class UserServices  {
  
   getUsers = async (req : any) => {
    try {
      const users:any = await User.findAll();
      const user = users.map((value: any) => {
        return userEntity.createFromObject(value);
      });
      return {statusCode : statusCode.SUCCESS,message : user};
    } catch (err) {
      console.log(err);
      return {statusCode : statusCode.SERVER_ERROR , message : message.SERVER_ERROR}
    }
  };
   getUser = async (req : any) => {
  try {
      const user:any = await User.findOne({
          where : {
              email : req.body.email,
          }
      })
   if (user && user.password === req.body.password) {
      req.session.userId = user.id;
      return {statusCode : statusCode.SUCCESS,message : message.SUCCESS[3]};
      } 
    if (!user){
      return {statusCode : statusCode.UNAUTHORIZED,message : message.NOT_EMAIL};
    }
  else{
    return {statusCode:statusCode.UNAUTHORIZED,message : message.INVALID};
}
  }catch (err) {
    console.log(err);
    return {statusCode : statusCode.SERVER_ERROR , message : message.SERVER_ERROR};
  }
};
 addUser = async (req : any) => {
    try {
      const validationBody = userValidation.addUser(req);
      if (validationBody.fails()) {
        return {statusCode : statusCode.UNAUTHORIZED,errors : validationBody.errors.all()};
      } else {
        const oneUser:any = await User.findOne({
            where : {
              email : req.body.email,
            }
        })
        if (oneUser) {
          return {statusCode : statusCode.SUCCESS,message : message.ALREADY_TAKEN};
        } else {
          const body = req.body;
          const id = uuidv4();
          const dtoUser = userEntity.createFromInput(id,body);
          const daoUser = await User.create(dtoUser);
          return {statusCode : statusCode.CREATED,message : message.SUCCESS[0]};
        }
      }
    } catch (err) {
      console.log(err);
      return {statusCode : statusCode.SERVER_ERROR , message : message.SERVER_ERROR};
    }
  };



}
export default new UserServices();
