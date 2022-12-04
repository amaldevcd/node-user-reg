var express = require('express')
const mysql = require('mysql');


const router = express.Router();

var errormsg=null;
var newuser=true;
var successnote=null;

var connection = mysql.createConnection({
    host:'localhost',
    user : 'root',
    password:'',
    database : 'sampusr'
})

connection.connect(function(error)
{
    if(!!error)
    {
        console.log(error);
    }
    else{console.log("Connected to the db");}
})



router.get('/page',(req,res)=>{
    res.render('signup',{title:"Sign Up",errormsg,successnote})
})

router.post('/',async (req,res)=>{
    var name = req.body.name;
    var username = req.body.username;
    var mobno=req.body.mobno;
    var passwd=req.body.passwd;
    var cpasswd=req.body.cpasswd;
    var usernameSearch = "select username from userdet where username='"+username+"'";

    await connection.query(usernameSearch,async function(error,result,rows){
        console.log("usrsrch : "+result + " "+result.length)
        if(!!error)console.log(error);
        else{
            if(result.length==0)
            {
                newuser=true;
                console.log("new user");
            }
            else
            {
                newuser=false;
                console.log("Not new user");
            }
        }
        console.log(name + " " + username + " " + mobno + " " + passwd + " ");
    if(name=="" || username=="" || mobno=="" || passwd=="" || cpasswd=="")
    {
        errormsg="empty datafields";
        res.redirect('/signup/page');
    }
    else if(newuser==false)
    {
        errormsg="username already exist";
        res.redirect('/signup/page');
    }
    else if(passwd!=cpasswd)
    {
        errormsg="passwords do not match";
        res.redirect('/signup/page');
    }
    else
    {
        console.log("usr status : ",newuser);
        var insertion = "insert into userdet values('"+name+"','"+username+"','"+mobno+"','"+passwd+"')"
        await connection.query(insertion,function(error,result){
            if(!!error)
            {
                console.log(error);
            }
            else{
                successnote = "Successfully registered";
                console.log("added to db");
                res.redirect('/signup/page');
                
            }
                

        })
        
    }

    })

    
})

module.exports = router;