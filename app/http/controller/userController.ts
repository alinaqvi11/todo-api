import userServices from "../../src/services/user/userServices";

class UserController {
  static getUsers = async (req: any, res: any) => {
    const user = await userServices.getUsers();
    res.status(200).send(user);
  };

  static logInUser = async (req: any, res: any) => {
    const user = await userServices.logInUser(req);
    res.send(user);
  };

  static addUser = async (req: any, res: any) => {
    const user = await userServices.addUser(req);
    res.send(user);
  };
}

export default UserController;
