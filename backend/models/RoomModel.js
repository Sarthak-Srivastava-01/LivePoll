const {Schema, model} = require('../connection');

// To define structure
const mySchema = new Schema({
    name : {type : String, required : true},
    createdAt : {type : Date, default : Date.now}
})

module.exports = model('rooms', mySchema);