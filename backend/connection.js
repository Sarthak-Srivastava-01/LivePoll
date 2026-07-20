const mongoose = require('mongoose');

const url = 'mongodb+srv://sarthaksrivastava1398:sartmongo@cluster0.zylkuuk.mongodb.net/livepolldb?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(url)
.then((result) => {
    console.log('Connected to mongodb');    
}).catch((err) => {
    console.log(err);    
});

module.exports = mongoose;