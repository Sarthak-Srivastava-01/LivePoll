const {Schema, model} = require('../connection');

// To define structure
const mySchema = new Schema({
    full_name : {type : String, required : true},
    email : {type : String, unique : true},
    password : String,
    createdAt : {type : Date, default : Date.now}
})

module.exports = model('users', mySchema);