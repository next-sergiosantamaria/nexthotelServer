const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    userId:   {type: String, required: true, max: 100},
    userName:   {type: String, required: true, max: 100},
    userBirthDate:   {type: String, required: true, max: 100},
    userGender: {type: String, required: true, max: 100},
    currentDate:   {type: String, required: true, max: 100},
    planeta:   {type: String, required: true, max: 100},
    skills:   {type: Array, required: true, max: 100},
    proyecto:   {type: String, required: true, max: 100},
    avatarConfig: {type: String, required: true, max: 100},
});

var user = module.exports = mongoose.model('userDatas', userSchema);

module.exports.get = function (callback, limit) {
    user.find(callback).limit(limit);
}