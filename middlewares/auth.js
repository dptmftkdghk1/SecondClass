module.exports = (req, res, next) => {
    if(req.session.student!=null)
        next();
    else
        res.redirect('/auth/signin');
};