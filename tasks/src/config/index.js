require('dotenv').config()
module.exports = {
    mongoURL : process.env.MONGO_URL,
    amq: process.env.AMQ,
    qName: 'BUNNY_STUDIO_TASKS'
}