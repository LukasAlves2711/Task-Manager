const express = require('express')
const app = express()
const mongoose = require('mongoose')
const taskRoute = require('./routes/taskRoute')
const path = require('path');

mongoose.connect("mongodb://localhost:27017/task", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    connection => {
        console.log("The database is loaded");
        let db = mongoose.connection;
        app.use('/', taskRoute);
        app.set('view engine', 'ejs')
        app.set('views', path.join(__dirname, 'templates'))
        app.listen(process.env.PORT || 3000, () => console.log("Runnig"))
    },
    error => {
        console.log("There is an error");
        console.error(error);
    }
);