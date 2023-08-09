const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')


const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({ tasks })
})

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task });
})

const getTask = asyncWrapper(async (req, res) => {
    const { id: TaskID } = req.params
    const task = await Task.findById({ _id: TaskID })
    if (!task) {
        return res.status(404).json({ msg: `no task with task ID = ${TaskID}` })
    }
    res.status(201).json({ task })
})
const deleteTask = asyncWrapper(async (req, res) => {
    const { id: TaskID } = req.params
    const task = await Task.findByIdAndDelete({ _id: TaskID })
    if (!task) {
        return res.status(404).json({ msg: `no task exist with ID = ${TaskId}` })
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
        return res.status(404).json({ msg: `no task with id = ${TaskID}` })
    }
    res.status(201).json({ task })
})


module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };