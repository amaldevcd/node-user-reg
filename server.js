const express = require('express');
const bodyparser = require('body-parser');
const session = require('express-session');
const {v4:uuid4} = require("uuid");

const login = require('./login');
const signup = require('./signup');
const home = require('./home');

const app = express();

app.set('view engine','ejs');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));


app.get('/',(req,res)=>{
    res.render('base',{title:"Home"});
})

app.use(session({
    secret:uuid4(),
     resave: false,
     saveUninitialized:true
 }))

app.use('/login',login);
app.use('/signup',signup )
app.use('/home',home)



app.listen(3030,()=>{
    console.log("Server is starting ...");
})