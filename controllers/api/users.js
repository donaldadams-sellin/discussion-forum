const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    create,
    login,
    ban
};

async function create(req, res) {
    try {
        //Add user to db
        const user = await User.create(req.body);
        //create a token using user obj
        const token = createJWT(user);
        //use res.json to send back string
        res.json(token);ß
    } catch {
        //client is looking for non-2xx status code
        //400 = Bad Request
        res.status(400).json('Sign Up Failed');
    }
}

async function login(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) throw new Error();
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) throw new Error();
        res.json(createJWT(user));
    } catch {
        res.status(400).json('Bad Credentials');
    }
}

async function ban(req, res) {
    try {
        const user = await User.findById(req.params.id)
        if (!req.user.isAdmin || user.isAdmin) {
            throw new Error();
        }
        user.isBanned = !user.isBanned;
        await user.save();
        res.json(user);

    } catch {
        res.status(400).json('Ban Failed');
    }
}


//Helper Functions
function createJWT(user) {
    return jwt.sign(
        { user },
        process.env.SECRET,
        { expiresIn: '24h' }
    );
}
