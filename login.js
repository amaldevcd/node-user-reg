var express = require('express')
const router = express.Router();
const mysql = require('mysql')
const db = require('./db');

var errormsg=null;

router.get('/page',(req,res)=>{
    res.render('login',{title:"Login",errormsg})
})

router.post('/',async (req,res)=>{
    var username = req.body.username;
    var passwd = req.body.passwd;
    var userSearch = "select passwd from userdet where username ='"+username+"'"
    await db.query(userSearch,async (error,rows,result,field)=>
    {
        if(!!error)
        {
            res.redirect('/login/page');
        }
        if(result.length==0)
        {
            errormsg="Incorrect usernmae or pasword";
            res.redirect('/login/page');
        }
        else if(result.length==1)
        {
            if(rows[0].passwd==passwd)
            {
                console.log("Successfull login");
                req.session.user=username;
                res.redirect('/home');
            }
            else
            {
                console.log("Incorrect usernmae or pasword");
                errormsg="Incorrect usernmae or pasword";
                res.redirect('/login/page');
            }
        }
    })

})

module.exports = router;