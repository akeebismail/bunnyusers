const Joi = require('joi')

module.exports = {
    createUserValidation: Joi.object({
        name: Joi.string().required()
    }),
    updateUserValidation: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required()
    })
}