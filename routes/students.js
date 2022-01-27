const express = require('express');
const router = express.Router();

const studentDB = require('../models/students');

/* GET users listing. */
router.get('/', async (req, res) => {
  const students = await studentDB.getStudents();
  res.render('students', {students:students});
});

router.get('/:studentId', async (req, res) => {
  res.render('student_detail');
});

module.exports = router;
