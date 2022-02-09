class UserEntity {

  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
  
  
  constructor(id:string, name:string, email:string, password:string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;

  }
   static createFromInput = (id:string,body : any) => {
   const user =  new UserEntity(
        id, 
        body.name, 
        body.email, 
        body.password,
   );  
   user.createdAt = new Date();
   user.updatedAt = new Date(); 
   return user;

  };
   static createFromObject = (obj:any) => {
    const user = new UserEntity(
        obj.id, 
        obj.name , 
        obj.email,
        obj.password,
        );
        user.createdAt = obj.createdAt;
        user.updatedAt = obj.updatedAt;
        return user;
  };
}
export default UserEntity;
