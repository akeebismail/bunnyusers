const express = require('express')
const router = express.Router()
const config = require('../config')
const User = require('../models/user.model')
const validate = require('../middlewares/validate')
const response = require('./response')
const {createUserValidation, updateUserValidation} = require('../validations/user.validation')
const amq = require('amqplib').connect(process.env.AMQ)
router.post('/create', validate(createUserValidation),async (req, res) => {
    try {
        const user = await User.createUser(req.body)
       response.respond(res, {
            success: true,
            message: 'user created successfully.',
            data: user
        })
        //Publish user create
        amq.then(conn => {
            return conn.createChannel();
        }).then(channel => {
            return channel.assertQueue(config.qName).then(ok => {

                return channel.sendToQueue(config.qName, Buffer.from(JSON.stringify({
                    action: 'user_created',
                    data: user
                })))
            })
        }).catch(console.warn)
    }catch (e) {
        console.log(e)
        return response.respondWithInternalError(res)
    }
})
router.put('/:id/update', validate(updateUserValidation), async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({_id: req.params.id}, {
            name: req.body.name,
            email: req.body.email
        })
        if (user) {
            return response.respond(res, {status_code: 200, message: 'user updated successfully', data: user})
        }
        return  response.respond(res, {
            success: false,
            status_code: 404,
            message: 'User not found',
            data: []
        }, 404)
    }catch (e) {
        console.log(e)
        return  response.respondWithInternalError(res)
    }
})
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).lean().exec()
        //return res.send(user)
        return  response.respond(res, {
            success: true,
            status_code: 200,
            message: 'User details',
            data: user
        })
    }catch(e) {
        return response.respondWithInternalError(res)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findOneAndDelete({_id: req.params.id}).exec()
        //publish user deleted
        amq.then(conn => {
            return conn.createChannel();
        }).then(channel => {
            channel.assertQueue(config.qName).then(ok => {
                channel.sendToQueue(config.qName, Buffer.from(JSON.stringify({
                    action: 'user_deleted',
                    data: user
                })))
            })
        })
        return response.respond(res,{
            status_code: 204,
            message: 'User deleted successfully',
        }, 204)
    }catch (e) {
        console.log(e)
        return response.respondWithInternalError(res)
    }
})

router.get('/', async (req, res) => {
    try {
        const users = await User.find().lean().exec();
        return response.respond(res, {
            success: true,
            status_code: 200,
            message: 'List of all users.',
            data: users
        })
    }catch (e) {
        console.log(e)
        return  response.respondWithInternalError(res)
    }
})
module.exports = router;