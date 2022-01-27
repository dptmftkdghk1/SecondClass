const express = require('express');
const router = express.Router();

const lectureDB = require('../models/lectures');
const enrollmentDB = require('../models/enrollments');

/* GET users listing. */
router.get('/', async (req, res) => {
  const lectures = await lectureDB.getLectures();
  res.render('lectures', {lectures:lectures});
});

router.get('/:lectureId', async (req, res) => {
  const lectures = await lectureDB.getLectureById(req.params.lectureId);
  let lecture, students;
  if(lectures && lectures.length==1){
    lecture = lectures[0];
    students = await enrollmentDB.getEnrollmentsByLecture(req.params.lectureId);
  }
  res.render('lecture_detail', {lecture:lecture, students:students});
});

module.exports = router;
