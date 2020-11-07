const express = require('express')
const router = express.Router()
const userRoutes = require('./user.route')
router.use('/users', userRoutes)
router.use((req, res, next) => {
    return res.status(404).send({
        status: 404,
        message: 'Requested endpoint is not found.',
        data: []
    })
})
module.exports = router;