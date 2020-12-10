const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InvitationSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true,
        required: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    adressee: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    accepted: {
        type: Boolean,
        default: false,
        required: true
    }
},
    { timestamps: true });

const Invitation = mongoose.model('Invitation', InvitationSchema);

module.exports = Invitation;