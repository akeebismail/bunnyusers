const Joi = require('joi')
const status = ['to do', 'done']
module.exports = {
    addTask: Joi.object({
        user_id: Joi.string().required(),
        description: Joi.string(),
        status: Joi.valid('to do', 'done')
    }),
    updateTask: Joi.object({
        user_id: Joi.string(),
        description: Joi.string(),
        status: Joi.valid('to do', 'done')
    })
}