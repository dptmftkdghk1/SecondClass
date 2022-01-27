const express = require('express');
const router = express.Router({mergeParams:true});
const teachers = require('./teachers');
const lectures = require('./lectures');
const auth = require('./auth')
const token = require('./token');

router.use('/teachers', teachers);
router.use('/lectures', lectures);
router.use('/auth', auth);
router.use('/token', token);

module.exports = router;