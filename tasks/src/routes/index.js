const express = require('express')
const router = express.Router()
const taskRoutes = require('./tasks.route')
router.use('/tasks', taskRoutes)
router.use((req, res, next) => {
    return res.status(404).send({
        status: 404,
        message: 'Requested endpoint is not found.',
        data: []
    })
})
module.exports = router;