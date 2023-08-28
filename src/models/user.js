const mongoose = require("mongoose");
const validator = require("validator");
const router = require("../routers/user");


const User = mongoose.model("User", {
    username:
    {
        type: String,
        required: true,
        //delete spaces 
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validat(val) {
            if (!validator.isEmail(val)) {
                throw new Error("is email invalidd  ")
            }
        }
    },
    age: {
        type: Number,
        default: 18 , 
        validat(val) {
             if (val <= 0 ) {
                throw new Error("num must be positive num")
            }
        }
    }
    ,
    city: {
      type: String
    }

})


// lllllllllllllllllllllll  lec 11 --------------------------



/////////////////////////////////////////////////




module.exports = User; 
 