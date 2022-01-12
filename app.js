const express = require('express')
const app = express()
const session = require('express-session')


app.use(express.json())

app.use(session({
    secret: "mykey",
    saveUninitialized:false,
    resave: false 
  }));

const todoRoutes = require('./src/http/routes/todoRoutes');
app.use('/api',todoRoutes);

const userRoutes = require('./src/http/routes/userRoutes');
app.use('/api',userRoutes);


module.exports = app;