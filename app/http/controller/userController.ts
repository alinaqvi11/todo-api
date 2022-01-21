import userServices from "../../src/services/user/userServices";

class UserController {
  static getUsers = async (req: any, res: any) => {
    const user:any = await userServices.getUsers();
    res.status(200).send(user);
  };

  static logInUser = async (req: any, res: any) => {
    const user:any = await userServices.logInUser(req);
    res.status(user.statusCode).send(user);
  };

  static addUser = async (req: any, res: any) => {
    const user:any = await userServices.addUser(req);
    res.status(user.statusCode).send(user);
  };
}

export default UserController;
