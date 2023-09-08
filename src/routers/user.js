// const mongoose = require("mongoose");
const express = require("express")
const User = require("../models/user")

const router = express.Router()

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const app = express()
// app.use(express.json())
 
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
        
        const updats = Object.keys(req.body)
        console.log(updats); //return arrrray

        const _id = req.params.id 



        // const user = await User.findByIdAndUpdate(_id, res.body, {
        //     new: true, // to get the new patching 
        //     runValidators: true  // to contenuing with validators 
        // })


        const user = await User.findPyId(_id)

        if (!user) {
            return res.status(404).send("errorrr 404 no user founded")
        }

        updats.forEach((e) => (
            user[e] = req.body[e]
        ))
        await user.save()


        res.status(200).send(user)
    }
     catch(e) {
          res.status(400).send(e)
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

// ---------------------------------lec 13  ...... 07-09-2023 ////////////////////////////////////////

//login

//post to entr data

router.post("/login", async(req, res) => {
    try {
        
        const user = await User.findByCredentials(req.body.email, req.body.password)
        
        const token = await user.generateToken()

        res.status(200).send({u: user , t: token})
        
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

///////////////////////////////////////////////////////////////////////////////

////////////////////////////start lec 14 json web

router.post("/users", async (req, res) => {
    try {
        const user = new user(req.body);
        const token = await user.generateToken()

        await user.save()
    
        res.status(200).send({user , token})
        
    }
    catch(e) {
        res.status(400).send(e)
        
    }
})




// //////////////////////////////////////end lec 14



// /////////////////////////start lec 15

//profile ...

router.get("/profile", auth, async (req, res) => {
   
       res.status(200).send(req.user)
   
} )

// logout ...

router.delete("/logout", auth, async (req, res) => {
    try {
        console.log(req.user);
        req.user.tokens = req.user.tokens.filter((el) => {
            return el !== req.token
        })
        await req.user.save()
        res.send()
    }
    catch (e) {
       res.status(500).send(e)
    }
})

// logout all


router.delete("/logoutAll", auth, async (req, res) => {
    try {
        console.log(req.user);
        req.user.tokens = []
        req.user.save()
        res.send()
    }
    catch (e) {
       res.status(500).send(e)
    }
})

// //////////////////////////////////////end lec 15




// /////////////////////////////////////////////////////////////////////////

module.exports = router; 


