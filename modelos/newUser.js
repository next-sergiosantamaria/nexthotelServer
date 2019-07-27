const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    testerName: {type: String, required: true, max: 100},
    userName:   {type: String, required: true, max: 100},
    userBirthDate:   {type: String, required: true, max: 100},
    userGender: {type: String, required: true, max: 100},
    currentDate:   {type: String, required: true, max: 100},
    experimentDuration:   {type: String, required: true, max: 100},
    roomOfexperiment:   {type: String, required: true, max: 100},
    experiment:   {type: String, required: true, max: 100},
    lampLed: {type: String, required: true, max: 100},
    lampInteraction: {type: String, required: true, max: 100},
    tvLed: {type: String, required: true, max: 100},
    tvInteraction: {type: String, required: true, max: 100},
    courtinLed: {type: String, required: true, max: 100},
    courtinInteraction: {type: String, required: true, max: 100}
});

var user = module.exports = mongoose.model('userDatas', userSchema);

module.exports.get = function (callback, limit) {
    user.find(callback).limit(limit);
}