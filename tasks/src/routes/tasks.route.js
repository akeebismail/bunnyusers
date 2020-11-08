const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const response = require('./response')
const Task = require('../models/task.model')
const validate = require('../middlewares/validate')
const {addTask, updateTask} = require('../validations/tasks.validation')
router.post('/add-task', validate(addTask),async (req, res) => {
    try {
        const task = await Task.addTasks(req.body)
        return response.respond(res, {
            success: true,
            status_code: 200,
            message: 'Task added successfully',
            data: task
        })
    }catch (e) {
        console.log(e)
        return response.respondWithInternalError(res)
    }
})

router.get('/:id/task', async (req, res) => {
    const task = await Task.findById(mongoose.Types.ObjectId(req.params.id)).lean().exec()
    return response.respond(res, {
        success: true,
        status_code: 200,
        message: 'Task details',
        data: task
    })
})

router.put('/:id/update', validate(updateTask), async (req, res) => {
    const task = await Task.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.params.id)}, req.body, {new: true, upsert: true}).exec()
    if (task) {
        return response.respond(res, {
            success: true,
            status_code: 200,
            message: 'Task added successfully',
            data: task
        })
    }
    return response.respond(res, {
        success: false,
        status_code: 404,
        message: 'Task not found.',
        data: []
    }, 404)
})

router.delete('/:id', async (req, res) => {
    const task = await Task.findOneAndDelete({_id: mongoose.Types.ObjectId(req.params.id)}).exec()
    const tasks = await Task.find().exec();
    if (task) {
        return response.respond(res, {
            success: true,
            status_code: 204,
            message: 'Task deleted successfully',
            data: tasks
        }, 200)
    }
    return response.respond(res, {
        success: false,
        status_code: 404,
        message: 'Task not found.',
        data: []
    })
})

router.get('/', async (req, res) => {
    const tasks = await Task.find().lean().exec();
    return response.respond(res, {
        success: true,
        status_code: 200,
        message: 'List of all tasks',
        data: tasks
    })
})
//Get user tasks
router.get('/:id/user', async (req, res) => {
    const tasks = await Task.find({user_id: mongoose.Types.ObjectId(req.params.id)}).lean().exec();
    return response.respond(res, {
        success: true,
        status_code: 200,
        message: 'User tasks fetched successfully.',
        data: tasks
    })
})

module.exports = router