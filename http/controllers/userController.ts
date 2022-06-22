import userService from "../../app/application/user/userServices";
import HttpResponse from "../../app/application/utils/httpResponse";
class UserController {
  static getUsers = async (req: any, res: any) => {
    const users:any = await userService.getUsers(req);
    HttpResponse.convertToExpress(res, users);
  };

  static getUser = async (req: any, res: any) => {
    const user:any = await userService.getUser(req);
    HttpResponse.convertToExpress(res, user);
  };

  static addUser = async (req: any, res: any) => {
    const user:any = await userService.addUser(req);
    HttpResponse.convertToExpress(res, user);
  };
}

export default  UserController;
