import userService from "../../app/application/services/user/userServices";

class UserController {
  static getUsers = async (req: any, res: any) => {
    const user:any = await userService.getUsers(req);
    res.status(user.statusCode).send(user);
  };

  static getUser = async (req: any, res: any) => {
    const user:any = await userService.getUser(req);
    res.status(user.statusCode).send(user);
  };

  static addUser = async (req: any, res: any) => {
    const user:any = await userService.addUser(req);
    res.status(user.statusCode).send(user);
  };
}

export default  UserController;
