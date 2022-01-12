const validator = require("validatorjs");

class UserValidation {
  signUp = (req) => {
    const body = req.body;
    console.log(body);
    const rules = {
      name: "required|string",
      email: "required|email",
      password: "required|string",
    };
    const validation = new validator(body, rules);
    return validation;
  };
}

module.exports = new UserValidation();
