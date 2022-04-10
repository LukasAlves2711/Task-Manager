const mongoose = require('mongoose')


const taskSchema = new mongoose.Schema({

    task: { type: String, required: true },
    description: String
})

module.exports = mongoose.model('Task', taskSchema)