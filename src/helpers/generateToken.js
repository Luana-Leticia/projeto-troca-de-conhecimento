const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

const secretKey = process.env.SECRET_KEY;

const generateToken = (params = {}) => {
    return jwt.sign(params, secretKey, { expiresIn: 1800 });
}

module.exports = {
    generateToken
}