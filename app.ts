import express from 'express';
const app = express();
import session from 'express-session';

app.use(express.json())

app.use(session({
    secret: "mykey",
    saveUninitialized:false,
    resave: false 
  }));
import todoRoutes from './app/http/routes/todoRoutes';
app.use('/api',todoRoutes);

import  userRoutes from'./app/http/routes/userRoutes';
app.use('/api',userRoutes);


export default app;