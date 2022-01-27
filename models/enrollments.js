const db = require('./db');

// 모든 수강 정보
exports.getEnrollments = async()=>{
    let sql = 'select e.*, l.title, s.name from enrollment e ';
    sql += 'left join lecture l on l.lectureId = e.lectureId ';
    sql += 'left join student s on s.studentId = s.studentId ';
    sql += 'order by e.lectureId asc';
    return await db.query(sql);
};

exports.getEnrollmentsByLecture = async(lectureId)=>{
    let sql = 'select e.*, s.name from enrollment e ';
    sql += 'left join student s on s.studentId = e.studentId ';
    sql += 'where e.lectureId=? '
    sql += 'order by e.studentId asc';
    return await db.query(sql, [lectureId]);
};

exports.getEnrollmentsByStudent = async(studentId)=>{
    let sql = 'select e.*, l.title, s.name from enrollment e ';
    sql += 'left join lecture l on l.lectureId = e.lectureId ';
    sql += 'left join student s on s.studentId = s.studentId ';
    sql += 'where e.studentId=? '
    sql += 'order by e.lectureId asc';
    return await db.query(sql, [lectureId]);
};