const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MeetingSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    }],
    topic: {
        type: String,
        required: true
    }
},
    { timestamps: true });

const Meeting = mongoose.model('Meeting', MeetingSchema);

module.exports = Meeting;