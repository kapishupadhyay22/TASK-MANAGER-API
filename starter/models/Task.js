const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true , 'must provide name'],
        trim: true,
        maxlength:[20 , 'name cant be mnore than 20 characters']
    },
    completed:{
        type:Boolean,
        defalut:false,
    }
})

module.exports = mongoose.model('Task',TaskSchema);