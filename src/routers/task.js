const express = require("express");
const Task = require("../models/task");

const { findByIdAndDelete } = require("../models/user");

const auth = require("../db/middleware/auth");

const router = express.Router();



//

//   add a new task : title & desc

router.post("/taskes",auth , async(req, res) => {
    
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(200).send(task)
    }
    catch (e) {
        res.status(500).send(e)
        
    }
})


// 

// view all tasks 

router.get("/taskes",auth , async(req, res) => {
    
    try {
        const tasks =  await Task.find({}) 
        res.status(200).send(tasks)
    }
    catch (e) {
        res.status(500).send(e.message)
        
    }
})


//
// view by id

router.get("/taskes/:id",auth , async(req, res) => {
    
    try {
        const tasks = await Task.findById(req.params.id) 
        if (!task) {
            return  res.status(404).send("cant find id ")
        }
        res.send(task)
    }
    catch (e) {
        res.status(500).send(e.message)
        
    }
})

//

// edit the task


router.patch("/taskes/:id",auth , async(req, res) => {
    
    try {
        const _id = req.params.id
        const tasks = await Task.findByIdAndUpdate({ _id }, req.body, {
            new: true,
            runvalidators:true
        }) 
        if (!task) {
            return  res.status(404).send("no task ")
        }
        res.send(task)
    }
    catch (e) {
        res.status(500).send(e.message)
        
    }
})


//

// delete

router.delete("/taskes/:id",auth , async(req, res) => {
    
    try {

       const tasks = await Task.findByIdAndDelete(req.params.id) 

        if (!task) {
               res.status(404).send("no task ")
        }
        res.status(200).send(task)
    }
    catch (e) {
        res.status(500).send(e.message)
        
    }
})


////////////////


module.exports = router ;

