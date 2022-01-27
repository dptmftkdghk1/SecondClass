const db = require('./db');

exports.getLectures = async()=>{
    let sql = 'select l.*, t.name, COUNT(e.studentId) as enrolled from lecture l ';
    sql += 'left join teacher t on t.teacherId=l.teacherId ';
    sql += 'left join enrollment e on e.lectureId=l.lectureId ';
    sql += 'group by e.lectureId '
    sql += 'order by l.lectureId asc';
    return await db.query(sql);
};

exports.getLectureById = async(lectureId)=>{
    let sql = 'select l.*, t.name, COUNT(e.studentId) as enrolled from lecture l ';
    sql += 'left join teacher t on t.teacherId=l.teacherId ';
    sql += 'left join enrollment e on e.lectureId=l.lectureId ';
    sql += 'where l.lectureId=?';
    return await db.query(sql, [lectureId]);
};

exports.addLecture = async(lecture)=>{
    const sql = 'insert into lecture(lectureId, title, maxStudent, teacherId) values(?,?,?,?)';
    return await db.query(sql, 
        [lecture.lectureId, lecture.title, lecture.maxStudent, lecture.teacherId]);
};

exports.removeLecture = async(lectureId)=>{
    const sql = 'delete from lecture where lectureId=?';
    return await db.query(sql, [lectureId]);
};