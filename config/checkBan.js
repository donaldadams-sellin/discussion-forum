const User = require('../models/user');

module.exports = async function(req, res, next){
    const user = await User.findById(req.user._id);
    if(user.isBanned) return res.status(401).json('Banned');
    next();
}