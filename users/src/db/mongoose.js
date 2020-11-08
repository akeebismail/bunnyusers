const mongoose = require('mongoose')
const config = require('../config/')
mongoose.connection.on('connected', () => {
    console.log('Database connected successfully!')
})
mongoose.connection.on('disconnected', (err) => {
    console.log('Database disconnect from MongoDB because of ' + err )
})

mongoose.connection.on('error', (err) => {
    console.log('Could not connect to Database via Mongoose because of ' + err)
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
            console.log('mongoose connected')
            resolve(mongoose.connection)
        }).catch(err => reject(err))

    })
}


//t5ZNjdDXuzyHd5Y5