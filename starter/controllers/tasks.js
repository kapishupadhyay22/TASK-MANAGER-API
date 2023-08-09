const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({ tasks })
})

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task });
})

const getTask = asyncWrapper(async (req, res, next) => {
    const { id: TaskID } = req.params
    const task = await Task.findById({ _id: TaskID })
    if (!task) {
        return next(createCustomError(`No task with ID = ${TaskID}`, 404))
    }
    res.status(201).json({ task })
})
const deleteTask = asyncWrapper(async (req, res) => {
    const { id: TaskID } = req.params
    const task = await Task.findByIdAndDelete({ _id: TaskID })
    if (!task) {
        return next(createCustomError(`No task with ID = ${TaskID}`, 404))
    }
    res.status(201).json({ task })
})

const updateTask = asyncWrapper(async (req, res) => {
    const { id: TaskID } = req.params

    const task = await Task.findByIdAndUpdate({ _id: TaskID }, req.body, {
        new: true,
        runValidators: true
    })
    if (!task) {
        return next(createCustomError(`No task with ID = ${TaskID}`, 404))
    }
    res.status(201).json({ task })
})


module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };