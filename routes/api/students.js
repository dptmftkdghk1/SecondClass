const express = require('express');
const router = express.Router();

const StudentDB = require('../models/students');
const enrollmentDB = require('../models/enrollments');

const auth = require('../middlewares/auth');
const log = require('../middlewares/log')

router.get('/', async (req, res) =>{
    const students = await StudentDB.getStudents();
    res.render('students', {students:students});
});

router.get('/:students', [log, auth], async (req,res)=>{ // 먼저 실행했으면 좋은 미들웨어를 앞에 기입 [1, 2] 순으로 동작
    const students = await StudentDB.getStudentById(req.params.studentId);
    let student, enrollments;
    if(student && students.length==1){
        student = students[0];
        console.log(student);
        enrollments = await enrollmentDB.getEnrollmentById(req.params.studentId);
        let student, enrollments;
    }
});