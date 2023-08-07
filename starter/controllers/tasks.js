const Task = require('../models/Task')

const getAllTasks = async (req, res) => {
    try {
        const task = await Task.find({})
        res.status(201).json({ task })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json({ task });
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const getTask = async (req, res) => {
    try {
        const { id: TaskID } = req.params
        const task = await Task.findById({ _id: TaskID })
        if (!task) {
            return res.status(404).json({ msg: `no task with task ID = ${TaskID}` })
        }
        res.status(201).json({ task })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}
const deleteTask = async (req, res) => {
    try {
        const { id: TaskID } = req.params
        const task = await Task.findByIdAndDelete({ _id: TaskID })
        if (!task) {
            return res.status(404).json({ msg: `no task exist with ID = ${TaskId}` })
        }
        res.status(201).json({ task })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const updateTask = async (req, res) => {
    try {
        const { id: TaskID } = req.params

        const task = await Task.findByIdAndUpdate({ _id: TaskID }, req.body, {
            new: true,
            runValidators: true
        })
        if (!task) {
            return res.status(404).json({ msg: `no task with id = ${TaskID}` })
        }
        res.status(201).json({ task })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}


module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };