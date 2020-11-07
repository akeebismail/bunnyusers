const Joi = require('joi')

module.exports = {
    createUserValidation: Joi.object({
        name: Joi.string().required()
    })
}