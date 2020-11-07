const express = require('express')
const router = express.Router()
const User = require('../models/user.model')
const validate = require('../middlewares/validate')
const {createUserValidation} = require('../validations/user.validation')
router.post('/create', validate(createUserValidation),async (req, res) => {
    const response = await User.createUser(req.body)
    return res.send(response)
})

module.exports = router;