const express = require('express');
const router = express.Router();

const teacherDB = require('../models/teachers');

/* GET users listing. */
router.get('/', async (req, res) => {
  const teachers = await teacherDB.getTeachers();
  res.render('teachers', {teachers:teachers});
});

router.get('/:teacherId', async (req, res) => {
    res.render('teacher_detail');
});

module.exports = router;
