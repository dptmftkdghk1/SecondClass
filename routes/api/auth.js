const express = require('express');
const router = express.Router();
const pbkdf2 = require('../../modules/pbkdf2');
const studentDB = require('../../models/students'); // sudentDB를 불러옴

router.post('/signin', async(req, res)=>{
    const { studentId, password } = req.body; // 구조분해 할당
    if(!studentId || !password){
        res.status(400).send("Invalid parameters"); // 400번이라는 에러코드를 발생
    }
   
    const student = await studentDB.getStudentById(studentId);
    if(student == null){ // 사용자 없음
        res.json({result:'ng'});
    } else {
        const key = await pbkdf2.getKey(password, student.salt);
        if(student.password == key){ // signin 성공
            req.session.student = {studentId:studentId, name:student.name};
            res.json({result:'ok'});
        } else { // 비밀번호 틀림
            res.json({result:'ng'});
        }
    }
});

router.get('/signout', (req,res)=>{
    req.session.destroy((err)=>{ // 로그아웃
        if(err) res.json({result:'ng'});
        else res.json({result:'ok'});
    })
});

router.get('/key', async(req,res)=>{
    if(req.query.password == undefined)
        res.json();

    const salt = await pbkdf2.getSalt();
    const key = await pbkdf2.getKey(req.query.password, salt);
    res.json({salt:salt, key:key});
});

module.exports=router;