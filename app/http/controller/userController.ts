import User from '../../infrastructure/model/userModel';
import userValidation from '../../src/validation/userValidation';
import userEntity from '../../domain/entities/userEntity';
import UserInterface from '../../src/interfaces/userInterface';

class UserController implements UserInterface {
   getUsers(req: any, res: any) {
     throw new Error('Method not implemented.');
   }
   logInUser(req: any, res: any) {
     throw new Error('Method not implemented.');
   }
   signUpUser(req: any, res: any) {
     throw new Error('Method not implemented.');
   }
   
 
   static getUsers = async (req : any, res : any) => {
    const user = await User.findAll();
    const users = user.map((value:any) => {
      return userEntity.createFromObject(value)
    })
    res.status(200).send(users);
  };

   static logInUser = async (req : any, res : any) => {
    try {
      const user:any = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (!user){
        res.status(404).send({ message: "Email not exist" });
      }
      if (user && user.password === req.body.password) {
        req.session.userId = user.id;
        res.status(200).send({ message: "log in successfully" });
      } else {
        res.status(404).send({ message: "Invalid email or password" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Internal Server Error" });
    }
  };

   static signUpUser = async (req : any, res : any) => {
    try {
      const validationBody = userValidation.signUp(req);
      if (validationBody.fails()) {
        res.status(400).send(validationBody.errors.all());
      } else {
        const oneUser = await User.findOne({
          where: {
            email: req.body.email,
          },
        });
        if (oneUser) {
          res.send({ message: "Email already taken" });
        } else {
          const body = req.body;
          const dtoUser = userEntity.createFromInput(body);
          const daoUser = await User.create(dtoUser);
          res.status(200).send({message : "Added successfully"});
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Internal Server Error" });
    }
  };
}

export default UserController;
