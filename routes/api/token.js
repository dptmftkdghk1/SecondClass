const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const teacherDB = require('../../models/teachers');

router.post('/signin', async (req, res)=>{
    const {teacherId, password} = req.body;
    if(!teacherId || !password){
        return res.status(400).end();
    }
    const teacher = await teacherDB.getTeacherById(teacherId);
    console.log(teacher);
    if(teacher && teacher.password == password){
        console.log('ok');
        const secret = req.app.get('jwt-secret');
        const payload = {
            sub: teacher.teacherId,
            name: teacher.name,
            aud: "SecondClass", // receiver
            iat: Math.floor(Date.now() / 1000), // issued at
        };
        const option={
            algorithm : "HS256",
            expiresIn : "30m",
            issuer : "SecondClass"
        };
        const result={
            token:jwt.sign(payload, secret, option),
            name:teacher.name,
            teacherId:teacher.teacherId
        };
        res.json(result);
    } else{
        console.log('ng');
        res.json();
    }
});

module.exports =router;