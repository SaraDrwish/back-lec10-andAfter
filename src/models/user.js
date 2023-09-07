const mongoose = require("mongoose");
const validator = require("validator");
const router = require("../routers/user");

const bcryptjs = require("bcryptjs");

const jwt = require("jsonwebtoken")

// schemaa placed after "user" the first one

// const User = mongoose.model("User", {
//     username:
//     {
//         type: String,
//         required: true,
//         //delete spaces
//         trim: true
//     },
//     password: {
//         type: String,
//         required: true,
//         trim: true,
//         minlength: 8
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         unique: true,
//         lowercase: true,
//         validat(val) {
//             if (!validator.isEmail(val)) {
//                 throw new Error("is email invalidd  ")
//             }
//         }
//     },
//     age: {
//         type: Number,
//         default: 18 ,
//         validat(val) {
//              if (val <= 0 ) {
//                 throw new Error("num must be positive num")
//             }
//         }
//     }
//     ,
//     city: {
//       type: String
//     }
// })


// lllllllllllllllllllllll  lec 12 --------------------------

const userSchema = new mongoose.Schema({

     username:
    {
        type: String,
        required: true,
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
        validate(val) {
            if (!validator.isEmail(val)) {
                throw new Error("is email invalidd  ")
            }
        }
        ,
        validate(val) {
            let password = new RegExp("^(?=.*[z-a])(?=.*[A-Z])(?.*[0-9])(?=.*[!@#\$%\^&\*])"); 

            if (!password.test(val)) {
                throw new Error("pass should have Capital letters and nums and speual chars ")
            }
        }
    },
    age: {
        type: Number,
        default: 18 ,
        validate(val) {
             if (val <= 0 ) {
                throw new Error("num must be positive num")
            }
        }
    }
    ,
    city: {
      type: String
    }
    ,
    tokens: 
        [
            {
                type: String,
                required:true
            }
    
        ]
   

} )

// hashing func before sending it ------

userSchema.pre("save", async function() {
    const user = this 
    ///what is user ??? document
    // data coming from user and saving === document 
    console.log(user)

    if(user.isModified("password"))
     user.password = await bcryptjs.hash(user.password , 8 )
} )

/////////////////////////////////////////////////////

//login

userSchema.statics.findByCredentials = async (em, pass) => {


    const user = await User.findOne({ email: em })
    // console.log(user)

    if (!user) {
        throw new Error ("unable to login el")
    }
    // console.log(user)

    const isMatch = await bcryptjs.compare(pass, user.password)
    
    if (!isMatch) {
          throw new Error ("unable to login pw")
    }

    return user
}

// //////////////////////////////////////////////////////////////end



// /////////////////////////start lec 14

userSchema.methods.generateToken = async function() {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, "sara5001");
    user.tokens = user.tokens.concat(token)
    await user.save()
    return token;

}


// ///////hide token and pass

userSchema.methods.toJSON = function () {
    
    const user = this 
    /// convert doc to object :
    const userObject = user.toObject();

    delete userObject.password
    delete userObject.tokens

    return userObject

} 


// .....////////////end lec 14





/////////////////////////////////////////////////////////

const User = mongoose.model("User", userSchema  );

/////////////////////////////////////////////////




module.exports = User; 
 