const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    name: {
      type: String
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    description: {
        type: String
    },
    state: {
        type: String,
        default: 'to do'
    }
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}})

taskSchema.statics = {
    async addTasks(payload) {
        const task = this.create(payload)
        return task;
    }
}

module.exports = mongoose.model('Task', taskSchema);