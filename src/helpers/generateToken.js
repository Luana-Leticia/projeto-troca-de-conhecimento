const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

const secretKey = process.env.SECRET_KEY;

const generateToken = (params = {}) => {
    return jwt.sign(params, secretKey, { expiresIn: 43200 });
}

module.exports = {
    generateToken
}