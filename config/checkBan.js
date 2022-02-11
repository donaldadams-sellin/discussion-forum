module.exports = function(req, res, next){
    if(req.user.isBanned) return res.status(401).json('Banned');
    next();
}