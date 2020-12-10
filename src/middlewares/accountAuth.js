const bcrypt = require('bcrypt');
const Account = require('../models/accountSchema');

const authenticate = async (request, response) => {
    const { email, password } = request.body;

    const account = await Account.findOne({ email: email }).select(['+email', '+password']);
    if (!account) {
        return response.status(400).json({ message: "Email inválido." });
    }

    if (!await bcrypt.compare(password, account.password)) {
        return response.status(400).json({ message: "Senha inválida." });
    }

    response.status(200).json({ message: "Bem vindo." });
}

module.exports = {
    authenticate
}