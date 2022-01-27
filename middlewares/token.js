const jwt = require('jsonwebtoken');
module.exports=(req, res, next)=>{
    const token = req.headers.authorization;
    if(!token){ // 토큰 없음 == 알 수 없는 사용자
        return res.status(403).end();
    }
    try{
        const secret = req.app.get('jwt-secret');
        const decodedToken = jwt.verify(token, secret);
        req.teacherId = decodedToken.sub;
        req.name = decodedToken.name;
        next();
    }catch(err){
        return res.status(403).end(); // 만료 등의 에러
    }
};