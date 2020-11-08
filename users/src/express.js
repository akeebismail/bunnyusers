const config = require('./config')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const http = require('http')
const routes = require('./routes')
const app = express();
const rawBodySaver = function (req, res, buf, encoding) {
    if (buf && buf.length) req.rawBody = buf.toString(encoding || 'utf8')
}
app.use(bodyParser.json({limit: '50mb', verify: rawBodySaver}))
app.use(bodyParser.urlencoded({limit: '50mb', verify: rawBodySaver, extended: false}))
app.use(cookieParser())
app.use(cors())

app.get('/', (req, res) => {
    console.log('testing');
    return res.send('Bunnystudio todo task')
})
app.get('/tests', (req, res) => {
    console.log('testing');
    return res.send('just testing...')
})
app.use(routes)

const appServer = http.createServer(app)
const initApp = () => {
    const port = process.env.PORT || 5000
    appServer.listen(port, (err) => {
        if (err) {
            console.log('Error starting app', err)
            process.exit(1)
        }
        console.log('APP is Ready!')
    })
}
module.exports = {
    app, initApp
}

