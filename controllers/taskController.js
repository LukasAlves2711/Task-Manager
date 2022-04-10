const Task = require('../models/Task')


const redirect = async(req, res, next) => {
    let task = req.params.task;
    try {
        let doc = await Task.findOne({ task })
        console.log(doc)
        if (doc) {
            res.send(doc)
        } else {
            next()
        }
    } catch (error) {
        res.send(error)
    }
}

const addTask = async(req, res) => {

    let task = new Task(req.body)

    try {
        let doc = await task.save()
        res.redirect('/')
    } catch (error) {
        res.render('add', { error, body: req.body })
    }
}

const allTasks = async(req, res) => {
    try {
        let docs = await Task.find({})
        res.render('all', { tasks: docs })
    } catch (error) {
        res.send(error);
    }
}

const deleteTask = async(req, res) => {

    let id = req.params.id;
    if (!id) {
        id = req.body.id;
    }

    try {
        await Task.findByIdAndDelete(id)
        res.redirect('/')
    } catch (error) {
        res.status(404).send(error);
    }
}

const loadTask = async(req, res) => {

    let id = req.params.id;

    try {
        let doc = await Task.findById(id)
        res.render('edit', { error: false, body: doc })
    } catch (error) {
        res.status(404).send(error);
    }
}

const editTask = async(req, res) => {

    let tks = {};
    tks.task = req.body.task;
    tks.description = req.body.description;

    let id = req.params.id;
    if (!id) {
        id = req.body.id;
    }

    try {
        let doc = await Task.updateOne({ _id: id }, tks)
        res.redirect('/')
    } catch (error) {
        res.render('edit', { error, body: req.body })
    }
}

module.exports = { redirect, addTask, allTasks, deleteTask, loadTask, editTask }