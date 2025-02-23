const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const jwtSecret = 'ab89abf0-198b-473d-9a8a-8bc05af58e0d';

const User = require('../models/User.js');
// auth
async function register(email, password, username) {
    const existing = await User.findOne({ email });
    
    if (existing) {
        throw new Error('email is taken');
    }
    const hashedPass = await bcrypt.hash(password, 5);
    const user = await User.create({
        email,
        password: hashedPass,
        username
    });
    const token = createSession(user);
    return {
        token,
        _id: user._id,
        username
    };
}
async function login(username, password) {
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error('wrong username or pass');
    }
    const hasMatch = await bcrypt.compare(password, user.password);
    if (!hasMatch) {
        throw new Error('wrong username or pass');
    }
    const token = createSession(user);
    return {
        token,
        _id: user._id,
        username
    };
}
function verifyToken(token) {
    return jsonwebtoken.verify(token, jwtSecret);
}
function createSession({ _id, email, username }) {
    const payload = {
        _id,
        email,
        username
    }
    const token = jsonwebtoken.sign(payload, jwtSecret);
    return token;
}

module.exports = {
    register,
    login,
    verifyToken
}