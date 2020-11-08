require('dotenv').config()
module.exports = {
    mongoURL : process.env.MONGO,
    qName: 'TASKS'
}