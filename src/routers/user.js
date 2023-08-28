// const mongoose = require("mongoose");
const express = require("express")
const User = require("../models/user")

const router = express.Router()

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const app = express()
app.use(express.json())
 
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.post("/users", (req, res) => {
    console.log(req.body);
    const user = new User(req.body)
    //pars outomaticly 
    app.use(express.json())
    user.save()
        .then((user) => {
            res.status(200).send(user)
        })
        //send to appear in the page
        .catch((e) =>{ res.status(400).send(e) } )
    // .catch( (e)=> console.log(e))
})


//    lec 11 -------------------------------///////////////////////////

// Get data

router.get("/users", (req, res) => {
    User.find({}).then((users) => {
           res.status(200).send(users)
    })
        .catch((e) => {
         res.status(500).send(e)
        })
      
})

// /////////////////////////////////

router.get( "/users/:id" , (req, res) => {
    //req.params == after id called ===
    // console.log(req.params)
    const _id = req.params.id
    User.findPyId(_id).then((user) =>{
        if (!user) {
          return res.status(404).send("unable to find user ") 
        }
        res.status(200).send(user) 
    }).catch((e) => {
        res.status(500).send(e)
    })
}
)

///////////////////////////////////
// patch == edit

router.patch("/users/:id", async (req, res) => {
    try {
        const _id = req.params.id 
        const user = await User.findByIdAndUpdate(_id, res.body, {
            new: true, // to get the new patching 
            runValidators: true  // to contenuing with validators 
        })
        if (!user) {
            return res.status(404).send("errorrr 404 no user founded")
        }
        res.status(200).send(user)
    }
     catch (error) {
          res.status(500).send( error )
    }

})

//////////////////////////////////////

router.delete("/users/:id", async (req, res) => {
    try {
        const _id = req.params.id
        const user = await User.findByIdAndDelete(_id)
        if (!user) {
            return res.status(404).send("inable to find user ")
        }
              res.status(200).send(user)
    }
    catch(e) {
        res.status(500).send(e)
    }
}
)

// -------------------------------------------------lec 12 ---------







module.exports = router; 


