const express = require('express');
const bodyparser = require('body-parser');

const login = require('./login');
const signup =require('./signup');

const app = express();

app.set('view engine','ejs');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));


app.get('/',(req,res)=>{
    res.render('base',{title:"Home"});
})



app.use('/login',login);
app.use('/signup',signup)

app.listen(3030,()=>{
    console.log("Server is starting ...");
})