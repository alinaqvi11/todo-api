import userServices from "../../src/services/user/userServices";

class UserController {
   getUsers = async (req: any, res: any) => {
    const user:any = await userServices.getUsers(req);
    res.status(user.statusCode).send(user);
  };

   getUser = async (req: any, res: any) => {
    const user:any = await userServices.getUser(req);
    res.status(user.statusCode).send(user);
  };

   addUser = async (req: any, res: any) => {
    const user:any = await userServices.addUser(req);
    res.status(user.statusCode).send(user);
  };
}

export default new UserController();
