import userServices from "../../src/services/user/userServices";

class UserController {
  static getUsers = async (req: any, res: any) => {
    const user:any = await userServices.getUsers();
    res.status(user.statusCode).send(user);
  };

  static getUser = async (req: any, res: any) => {
    const user:any = await userServices.getUser(req);
    res.status(user.statusCode).send(user);
  };

  static addUser = async (req: any, res: any) => {
    const user:any = await userServices.addUser(req);
    res.status(user.statusCode).send(user);
  };
}

export default  UserController;
