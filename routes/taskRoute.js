const express = require('express')
const router = express.Router()
var methodOverrite = require('method-override')

router.use(methodOverrite('_method'))
const taskController = require('../controllers/taskController')


// GET
router.get('/', taskController.allTasks)
router.get('/:task', taskController.redirect)
router.get('/add', (req, res) => res.render('add', { error: false, body: {} }))
router.get('/edit/:id', taskController.loadTask)


// POST
router.post('/', express.urlencoded({ extended: true }), taskController.addTask)
router.post('/edit/:id', express.urlencoded({ extended: true }), taskController.editTask)

// DELETE
// router.delete('/:id', taskController.deleteTask)
router.delete('/', express.urlencoded({ extended: true }), taskController.deleteTask)

module.exports = router