import express from 'express';

const app = express();
import session from 'express-session';

app.use(express.json())

app.use(session({
    secret: "mykey",
    saveUninitialized:false,
    resave: false 
  }));
import todoRoute from '../http/routes/todoRoutes';
app.use('/api',todoRoute);

import  userRoute from'../http/routes/userRoutes';
app.use('/api',userRoute);


export default app;