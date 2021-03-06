const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const AccountSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        maxlength: 50,
        select: false
    },
    password: {
        type: String,
        required: true,
        select: false,
        maxlength: 50
    },
    learningInterests: [String],
    domainKnowledges: [String],
    timeAvailability: {
        type: [{
            weekDay: {
                type: String,
                lowercase: true,
                enum: ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado']
            },
            periods: {
                type: [String],
                lowercase: true
            }
        }],
        select: false
    },
    photo_url: {
        type: String
    },
    age: {
        type: Number,
        min: 1,
        max: 120,
        select: false
    },
    location: {
        city: { type: String },
        state: { type: String }
    },
    phoneNumber: {
        type: String,
        select: false
    },
    meetings: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Meeting'
        }],
        select: false
    },
    invitations: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Invitation'
        }],
        select: false
    },
    friends: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Account'
        }]
    }
},
    { timestamps: true }
);

AccountSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;
