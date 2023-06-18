
const mongoose = require('mongoose');

const codingSchema = new mongoose.Schema({
    codingName: {
        type: String,
        required: true,
    },
   
    reflink : {
       type: String, 
    }
});

const  Coding= mongoose.model('Coding', codingSchema);

module.exports = Coding;
