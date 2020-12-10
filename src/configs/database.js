const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

const connect = () => {
    mongoose.connect(MONGO_URI, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
    const connection = mongoose.connection;
    connection.on('error', () => console.log('Erro ao conectar ao MongoDB.'));
    connection.once('open', () => console.log('Conectados ao MongoDB.'));
}

module.exports = {
    connect
}