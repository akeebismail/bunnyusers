const express = require('express')
const router = express.Router()
const User = require('../models/user.model')
const validate = require('../middlewares/validate')
const {createUserValidation, updateUserValidation} = require('../validations/user.validation')
router.post('/create', validate(createUserValidation),async (req, res) => {
    const response = await User.createUser(req.body)
    return res.send(response)
})
router.put('/:id/update', validate(updateUserValidation), async (req, res) => {
    const response = await User.findOneAndUpdate({_id: req.params.id}, {
        name: req.body.name,
        email: req.body.email
    })
    return res.send(response);
})
router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id).lean().exec()
    return res.send(user)
})

router.delete('/:id', async (req, res) => {
    const user = await User.findOneAndDelete({_id: req.params.id}).exec()
    return res.send(user)
})

router.get('/', async (req, res) => {
    const users = await User.find().exec();
    return res.send(users);
})
module.exports = router;