const config = require('../config')
require('../db/mongoose').connect()
let amq = require('amqplib').connect(config.amq)
const User = require('../models/user.model')
const Task = require('../models/task.model')
console.log(config.amq)
amq.then(conn => {
    return conn.createChannel();
}).then(channel => {
    return channel.assertQueue(config.qName).then(ok => {
        return channel.consume(config.qName, (msg) => {
            console.log('consuming message')
            if (msg) {
                console.log(msg.content.toString())
                const content = JSON.parse(msg.content)
                if (content.data !== null){
                    if (content.action === 'user_created') {
                        //new User Added
                        console.log('adding user record')
                        User.create( {
                            name: content.data.name,
                            user: content.data._id
                        })
                    } else if (content.action === 'user_deleted') {
                        console.log('deleting user records')
                        //user have been removed, delete todo
                        Task.find({user_id: content.data._id}).exec((err, doc)=> {
                            console.log(err, doc)
                            if (doc && doc.length > 0) {
                                doc.delete()
                            }
                        })
                        User.findOneAndDelete({user: content.data._id}).exec()
                    }
                }
                channel.ack(msg)
            }
        })
    })
}).catch(console.log)