const mongoose = require('mongoose')
const config = require('../config/')
mongoose.connection.on('connected', () => {
    console.log('Task Db connected successfully!')
})
mongoose.connection.on('disconnected', (err) => {
    console.log('Task Db disconnect from MongoDB because of ' + err )
})

mongoose.connection.on('error', (err) => {
    console.log('Could not connect to Task DB via Mongoose because of ' + err)
})

exports.connect = () => {
    let mongoURL = config.mongoURL
    return new Promise((resolve, reject) => {
        mongoose.connect(mongoURL,  {
            poolSize: 10,
            keepAlive: 1,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
            //  useUnifiedTopology: true
        }).then((conn) => {
            resolve(mongoose.connection)
        }).catch(err => reject(err))

    })
}
