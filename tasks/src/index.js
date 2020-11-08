const app = require('./express')
const db = require('./db/mongoose')
db.connect();
app.initApp();