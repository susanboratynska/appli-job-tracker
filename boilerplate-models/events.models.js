const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const networkingEventSchema = new Schema({
    name:{type: String, require: true},
    description:{type: String},
    date:{type: Date, require: true},
    location:{type: String},
    link:{type: String},
    host:{type: String, required: true},
    rating:{type: Number},
    notes:{type: String},
    isPublic:{type: Boolean},
    //creatorID:{type: userAccount, required: true} --TODO: reference the account that posted this event, so that only they can update and delete this event
},{
    timestamps: true,
});

const NetworkingEvent = mongoose.model('networkingevent', networkingEventSchema);

module.exports = NetworkingEvent;