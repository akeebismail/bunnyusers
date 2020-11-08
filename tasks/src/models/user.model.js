const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
    },
    user: {
        type: mongoose.Types.ObjectId
    }
}, { timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}})

userSchema.statics = {

}

module.exports = mongoose.model('User', userSchema);