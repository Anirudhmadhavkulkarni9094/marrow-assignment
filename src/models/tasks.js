import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, required: true },
  assignedTo: { type: String, required: true },
  tags: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now },
});

const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);

export default Task;
