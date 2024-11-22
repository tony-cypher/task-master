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
