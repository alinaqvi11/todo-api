import validator from 'validatorjs'
class UserValidation {
  static addUser = (req : any) => {
    const body = req.body;
    const rules = {
      name: "required|string",
      email: "required|email",
      password: "required|string",
    };
    const validation = new validator(body, rules);
    return validation;
  };
}

export default UserValidation;
