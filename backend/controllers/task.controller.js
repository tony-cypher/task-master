import Task from "../models/task.model.js";
import User from "../models/user.model.js";

export const createTask = async (req, res) => {
  try {
    const { text } = req.body;

    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!text) {
      return res.status(400).json({ error: "Task must have some text" });
    }

    const newTask = new Task({
      user: userId,
      text,
    });

    await newTask.save();

    res.status(201).json(newTask);
  } catch (error) {
    console.log("Error in createTask controller: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getUserTasks = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const tasks = await Task.find({ user: user._id })
      .sort({ createdAt: -1 })
      .populate({ path: "user", select: "-password" });

    res.status(200).json(tasks);
  } catch (error) {
    console.log("Error in getUserTasks controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    const userId = req.user._id;

    let task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task does not exist" });
    }

    if (userId.toString() !== task.user.toString()) {
      return res
        .status(401)
        .json({ message: "You are not authorized to update this task" });
    }

    if (!text) {
      return res.status(400).json({ error: "Task must have some text" });
    }

    task.text = text || task.text;

    task = await task.save();

    return res.status(200).json(task);
  } catch (error) {
    console.log("Error in updateTask: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ error: "You are not allowed to delete this task" });
    }

    await Task.findByIdAndDelete(req.params.id);

    // sends a success message
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log("Error in deleteTask controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
