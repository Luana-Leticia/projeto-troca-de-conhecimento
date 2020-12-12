const bcrypt = require('bcrypt');
const helper = require('../helpers/generateToken');
const Account = require('../models/accountSchema');

const signUp = async (request, response) => {
    const { username, email, password, passwordConfirmation } = request.body;

    const account = await Account.findOne({ email: email }).select('+email');
    if (account) {
        return response.status(400).json({ message: "Email já existe." });
    }

    if (password != passwordConfirmation) {
        return response.status(400).json({ message: "Confirmação de senha não confere." });
    }

    const newAccount = new Account({ username, email, password });
    await newAccount.save((error) => {
        if (error) {
            response.status(500).send(error);
        } else {
            const token = helper.generateToken({ id: newAccount.id });
            response.status(200).json({
                message: "Conta cadastrada com sucesso.",
                token: token
            });
        }
    });
}

const login = async (request, response) => {
    const { email, password } = request.body;

    const account = await Account.findOne({ email: email }).select(['+email', '+password']);
    if (!account) {
        return response.status(400).json({ message: "Email inválido." });
    }

    if (!await bcrypt.compare(password, account.password)) {
        return response.status(400).json({ message: "Senha inválida." });
    }

    account.password = undefined;

    const token = helper.generateToken({ id: account.id });

    response.status(200).json({ message: "Bem vindo.", token: token });
}

const viewAccount = async (request, response) => {
    const param = request.accountId;
    const account = await Account.findById(param).select('+email +age +phoneNumber +timeAvailability -friends');

    if (account) {
        response.status(200).send(account);
    } else {
        response.status(500).send({ message: "Internal error" });
    }
}

const findByName = (request, response) => {
    const param = request.params.username;
    Account.find({ username: param },
        (error, accounts) => {
            if (error) {
                response.status(500).send(error);
            } else if (accounts.length > 0) {
                response.status(200).json(accounts);
            } else {
                response.status(404).json({ message: "Nenhum resultado encontrado." });
            }
        }).populate('friends');
}

const findByDomain = (request, response) => {
    const param = request.params.interest;
    Account.find({ domainKnowledges: param },
        (error, accounts) => {
            if (error) {
                response.status(500).send(error);
            } else if (accounts.length > 0) {
                response.status(200).json(accounts);
            } else {
                response.status(404).json({ message: "Nenhum resultado encontrado." });
            }
        }).populate('friends');
}

const edit = async (request, response) => {
    const param = request.accountId;
    const body = request.body;
    if (body.password) {
        const hash = await bcrypt.hash(body.password, 10);
        body.password = hash;
    }

    const option = { new: true };
    Account.findByIdAndUpdate(param, body, option,
        (error, account) => {
            if (error) {
                response.status(500).send(error);
            } else {
                response.status(200).json({ message: "Conta alterada com sucesso." });
            }
        });
}

const remove = (request, response) => {
    const param = request.accountId;
    Account.findByIdAndDelete(param,
        (error, account) => {
            if (error) {
                response.status(500).send(error);
            } else {
                response.status(200).json({ message: "Conta deletada com sucesso." });
            }
        });
}

module.exports = {
    signUp,
    login,
    viewAccount,
    findByName,
    findByDomain,
    edit,
    remove
}