interface UserIntreface {
    getUsers(): Promise<any>;
    getUser(req: any): Promise<any>;
    addUser(req: any): Promise<any>;
}
export default UserIntreface;
