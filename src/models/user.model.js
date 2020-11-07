const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
        return user;
    }
}

module.exports = mongoose.model('User', userSchema);