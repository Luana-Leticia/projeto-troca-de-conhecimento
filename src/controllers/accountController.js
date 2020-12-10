const Account = require('../models/accountSchema');

const add = async (request, response) => {
    const { username, email, password, passwordConfirmation } = request.body;

    const account = await Account.findOne({ email: email });
    if (account) {
        return response.status(400).json({ message: "Email já existe." });
    }

    if (password != passwordConfirmation) {
        return response.status(400).json({ message: "Confirmação de senha não confere." });
    }

    const newAccount = new Account({ username, email, password });
    newAccount.save((error) => {
        if (error) {
            response.status(500).send(error);
        } else {
            response.status(200).json({ message: "Conta cadastrada com sucesso." });
        }
    });
}

const find = (request, response) => {
    Account.find(
        (error, accounts) => {
            if (error) {
                response.status(500).json(error);
            } else {
                response.status(200).send(accounts);
            }
        });
}

const findById = (request, response) => {
    const param = request.params.id;
    Account.findById(param,
        (error, account) => {
            if (error) {
                response.status(404).json({ message: "ID inválido" });
            } else {
                response.status(200).json(account);
            }
        });
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
        });
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
        });
}

const edit = (request, response) => {
    const param = request.params.id;
    const body = request.body;
    const option = { new: true };
    Account.findByIdAndUpdate(param, body, option,
        (error, account) => {
            if (error) {
                response.status(500).send(error);
            } else if (account) {
                response.status(200).json({ message: "Conta alterada com sucesso." });
            } else {
                response.status(404).json({ message: "ID inválido." });
            }
        });
}

const remove = (request, response) => {
    const param = request.params.id;
    Account.findByIdAndDelete(param,
        (error, account) => {
            if (error) {
                response.status(500).send(error);
            } else if (account) {
                response.status(200).json({ message: "Conta deletada com sucesso." });
            } else {
                response.status(404).json({ message: "ID inválido." });
            }
        });
}

module.exports = {
    add,
    find,
    findById,
    findByName,
    findByDomain,
    edit,
    remove
}