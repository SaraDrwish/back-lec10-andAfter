const mongodb = require("mongodb");
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/lec10");

// const Car = mongoose.model("Car", { type: String });

// const car1 = new Car({ type: "wbm" });

// //then means that i sent a peomis
// car1.save()
//     .then(() => console.log("car added"))

    // post , get , patch , delete ....
    

    // ..========= post ============


// /////////////////////////////////////////////////////////////////////////////////

//token lec 14

const jwt = require("jsonwebtoken");

const myToken = () => {
    
    const token = jwt.sign({ _id: "12345678" },  "sara5010" )
    console.log(token);

    const tokenVerfy = jwt.verify(token, "sara5010")
    console.log(tokenVerfy);

}

myToken()





// /////////////////////////////////////////////////////////////////////////////////


    // ///////////////////////////////////////

// to deal with front serverr

const express = require("express");

const app = express()
// app.use(express.json())
const port = process.env.PORT || 3000;

const userRouter = require("./routers/user");
app.use(userRouter)


// const taskRouter = require("./routers/task");
// app.use(taskRouter)

// --------------------------------lec 12 ----------------------------------------------------

// const bcryptjs = require("bcryptjs")

// const passwordFunc = async () => {
//     const pass1 = "zx123456";
//     const hashPass1 = await bcryptjs.hash (pass1, 8);
//     console.log("--pass : " + pass1 + " ----hash:  " + hashPass1 + "   -- end");

//     const comparePass = await bcryptjs.compare( "zx123456", hashPass1);

//     console.log(comparePass)
// }
 
// passwordFunc();


// ///////////////////////////// end lec 12 /////////////////


///////////////////lec 16 relations

const Task = require("./models/task");

const relationFunc = async () => {
    const task = await Task.findById("5226s5ds55d5sd55sd5s656");
    await task.populate("owner")
    console.log(task);
    console.log(task.owner);
    
}
relationFunc()







app.listen(port, () => {
    console.log("all done .......023-08-26...lec 11 + .... 12  + 13 +14 +15  ")
})














