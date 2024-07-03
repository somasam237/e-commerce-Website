//ToDo : create my schema for the database, so i prefer using nosql(mongodb) as the relationaldatabase
//because it is more efficient when i have big data to store.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    //i need user info, all info have to be mandatory, so required=true.
    // the thing with unique=true is very cool.
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model('user', UserSchema);
