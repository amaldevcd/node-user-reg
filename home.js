const express = require('express');
const router = express.Router();


router.get('/',(req,res)=>{
    if(req.session.user)
    {
        res.render('home',{title:"Home",user: req.session.user})
    }
    else
        res.redirect('/login/page');
})

router.get('/logout',(req,res)=>
{
    req.session.destroy((err)=>{
        if(err)
        {
            console.log(err);
            res.send;
        }
        else
            res.redirect('/');
    })
})
module.exports = router;