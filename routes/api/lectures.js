const express = require('express');
const router = express.Router();

const lectureDB = require('../../models/lectures');

/* GET users listing. */
router.get('/', async (req, res) => {
  const result = await lectureDB.getLectures();
  res.json(result);
});

router.get('/:lectureId', async (req, res) => {
  const result = await lectureDB.getLectureById(req.params.lectureId);
  res.json(result);
});

router.post('/', async(req, res)=>{
  const result = await lectureDB.addLecture(req.body);
  res.json(result);
});

module.exports = router;
