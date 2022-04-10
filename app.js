const express = require('express')
const app = express()
const PORT = 3000
const mongoose = require('mongoose')
const taskRoute = require('./routes/taskRoute')
const path = require('path');

mongoose.connect("mongodb://localhost/tasks", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

let db = mongoose.connection;

db.on("error", () => { console.log("There is an error") })
db.once("open", () => { console.log("The database is loaded") })

app.use('/', taskRoute);

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'templates'))

app.listen(PORT, () => console.log(`Runnig in port:${PORT}`))