class MyAppError extends Error {
    messages: any;
    statusCode: any
    constructor(statusCode: any,messages: any){
        super(messages);
        this.statusCode = statusCode;
        this.messages = messages;
        
    }
}

export default  MyAppError; 
    