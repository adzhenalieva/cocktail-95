const mongoose = require('mongoose');
const nanoid = require('nanoid');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;


const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
    token: {
        type: String, required: true
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['user', 'admin']
    },
    facebookId: {
        type: String
    },
    displayName: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    }
});

UserSchema.methods.checkPassword = function(password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function() {
    this.token = nanoid();
};

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

UserSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
