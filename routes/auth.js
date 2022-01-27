const express = require('express');
const router = express.Router();

router.get('/signin', (req, res)=>{
    res.render('signin');
});

router.get('/signout', (req,res)=>{
    req.session.destroy((err)=>{ // 로그아웃
       res.redirect('/');
    })
});
module.exports = router;