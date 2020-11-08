const mongoose = require('mongoose')
const Schema = mongoose.Schema
const config = require('../config')
const amq = require('amqplib').connect(process.env.AMQ)
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    } ,
}, { timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}})

userSchema.statics = {
    async createUser(payload) {
        const user = await this.create(payload)
        console.log(user)
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
        return this.find().exec();
    },
    async deleteUser(id) {
        const user = await this.findByIdAndDelete(id).exec();
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
        return this.find({}).exec();
    }
}

module.exports = mongoose.model('User', userSchema);