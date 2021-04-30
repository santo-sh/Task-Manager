const express = require('express');
const router = new express.Router();
const Task = require('../models/task')
const auth = require('../middleware/auth')

router.post('/tasks', auth, async (req, res)=>{
    const newTask = new Task({
        ...req.body,
        owner: req.user._id
    });
    try{
        await newTask.save()
        res.status(201).send(newTask)
    }catch(err){
        res.status(400).send(err)
    }

})
// tasks?completed=false or completed=true

//methods for pagination : 1. Limits 2. Skip
// GET /tasks/limit=10&skip=10
// GET /tasks/sortBy=createdAt:asc or /sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res)=>{
    const match = {}
    const sort = {}
    if(req.query.completed){
        match.completed = req.query.completed ===  'true'
    }
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'asc'? 1: -1;
    }
    try{
        // const tasks = await Task.find({owner: req.user._id})
        // or
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.status(200).send(req.user.tasks)
    }catch(err){
        res.status(500).send()
    }
})

router.get('/tasks/:id', auth, async (req, res)=>{
    const _id = req.params.id
    try{
        // const task = await Task.findById(_id)
        const task = await Task.findOne({ _id, owner: req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.status(200).send(task)
    }catch(err){
        res.status(500).send()
    }

})



router.patch('/tasks/:id', auth, async (req, res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ["description","completed"]
    const isValid = updates.every((update)=>{
        return allowedUpdates.includes(update)
    })
    if(!isValid){
        return res.status(400).send({ error: "invalid updates"})
    }
    try{
        // const updatedTask = await Task.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})

        const task = await Task.findOne({_id: req.params.id, owner: req.user._id})
        if(!task){
            return res.status(404).send();
        }

        updates.forEach((update)=>{
            task[update] = req.body[update]
        })
        await task.save()
        res.send(task)
        // console.log(updatedTask)
        res.status(200).send(task)
    }catch(err){
        res.status(500).send()
    }

})

router.delete("/tasks/:id", auth, async (req, res)=>{
    const _id = req.params.id;
    try{
        const task =await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(err){
        res.status(500).send()
    }
})

module.exports = router;