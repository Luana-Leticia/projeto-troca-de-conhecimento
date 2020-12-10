const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    participants: {
        type: [{ 
            type: Schema.Types.ObjectId, 
            ref: 'account'}]
    }

});

const Class = mongoose.model('class', ClassSchema);

module.exports = Class;