const Tasks = require("../models/taskModel");

const getTasks = async (req, res) => {
    try {
        const tasks = await Tasks.findAll();
        if(tasks) {
            res.json(tasks);
        } else {
            res.status(404).json({ error: "Tasks not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Tasks.findByPk(id);
        if (task) {
            res.json(task);
        } else {
            res.status(404).json({ error: "Task not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const createTask = async (req, res) => {
    const { title, createdDate, updatedAt, isCompleted } = req.body;
    try {
        const newTask = await Tasks.create({
            title,
            createdDate,
            updatedAt,
            isCompleted,
        });
        if (newTask) {
            res.status(201).json(newTask);
        } else {
            res.status(400).json({ error: "Unable to create a task" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, createdDate, updatedAt, isCompleted } = req.body;
    try {
        const task = await Tasks.findByPk(id);
        if (task) {
            task.title = title;
            task.createdDate = createdDate;
            task.updatedAt = updatedAt;
            task.isCompleted = isCompleted;
            await task.save();
            res.json(task);
        } else {
            res.status(404).json({ error: "Task not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Tasks.findByPk(id);
        if (task) {
            await task.destroy();
            res.json(task);
        } else {
            res.status(404).json({ error: "Task not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    getTasks,
    deleteTask,
    updateTask,
    createTask,
    getTaskById,
};
