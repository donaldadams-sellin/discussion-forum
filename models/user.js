const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

const userSchema = new Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true, 
        maxlength: 15 },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true,
        maxlength: 25
    },
    password: {
        type: String,
        trim: true,
        minLength: 3,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isBanned: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            delete ret.password;
            return ret;
        }
    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    //update password with computed hash
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    next;
});

module.exports = mongoose.model('User', userSchema);