const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    learningInterests: {
        type: [String]
    },
    domainKnowledge: {
        type: [String]
    },
    timeAvailability: {
        weekDay: { 
            type: String, 
            lowercase: true 
        }, 
        periods: { type: [String]} 
    },
    foto_url: {
        type: String
    },
    age: {
        type: Number
    },
    location: {
        city: { type: String },
        state: { type: String }
    },
    phoneNumber: {
        type: String
    },
    classes: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'class'
        }]
    },
    invitations: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'account'
        }]
    },
    friends: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'account'
        }]
    }
});

const Account = mongoose.model('account', AccountSchema);

module.exports = Account;
