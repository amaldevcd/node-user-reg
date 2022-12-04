var express = require('express')
const router = express.Router();

router.get('/page',(req,res)=>{
    res.render('login',{title:"Login"})
})

router.post('/',(req,res)=>{
    
})

module.exports = router;