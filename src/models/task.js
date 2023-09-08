const mongoose = require("mongoose")

const task = mongoose.model("Task" , {
    title: {
        type: String,
        required: true,
        trim:true

    },
    description: {
        type: String,
        required: true,
        trim:true 
    },
      completed: {
        type: Boolean,
        default: false
    }



})

module.exports = Task;

