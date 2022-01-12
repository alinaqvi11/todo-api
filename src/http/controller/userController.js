const uuid = require("uuid");
const User = require("../../model/userModel");
const userValidation = require("../../validation/userValidation");

class UserController {
   getUsers = async (req, res) => {
    const users = await User.findAll();
    res.status(200).send(users);
  };

   logInUser = async (req, res) => {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      if(!user){
        res.status(404).send({message : 'Email not exist'})
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

   signUpUser = async (req, res) => {
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
        console.log(oneUser);
        if (oneUser) {
          res.send({ message: "Email already taken" });
        } else {
          await User.create({
            id: uuid.v4(),
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
          });

          res.status(200).send({ message: "Added Successfully" });
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Internal Server Error" });
    }
  };
}

module.exports = new UserController;
