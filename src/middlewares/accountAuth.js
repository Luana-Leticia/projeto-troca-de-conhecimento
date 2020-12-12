const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authenticate = (request, response, next) => {
    const authHeader = request.header('Authorization');
    
    if (!authHeader) {
        response.status(401).json({ message: "Token não fornecido." });
    }
    const parts = authHeader.split(' ');

    if (!parts.length == 2) {
        response.status(401).json({ message: "Erro no token." });
    }

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme)) {
        response.status(401).json({ message: "Token mal realizado." });
    }

    const secretKey = process.env.SECRET_KEY;
    jwt.verify(token, secretKey, 
        (error, decoded) => {
            if (error) {
                response.status(400).json( { message: "Token inválido."});
            }

            request.accountId = decoded.id;

            return next();
    });
}

module.exports = {
    authenticate
}