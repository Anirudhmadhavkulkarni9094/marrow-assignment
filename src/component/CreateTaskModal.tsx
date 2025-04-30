import React, { useState } from "react";



interface Task {
  title: string;
  description: string;
  priority: string;
  assignedTo: string;
  tags: string[];
}

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (task: Task) => void;
  users: any;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  isOpen,
  onClose,
  onCreate,
  users,
}) => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "",
    assignedTo: "",
    rawTags: "", // user types raw tag input
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const processedTags = newTask.rawTags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);

    const task: Task = {
      ...newTask,
      tags: processedTags,
    };

    delete (task as any).rawTags;

    onCreate(task);
    onClose();
    setNewTask({
      title: "",
      description: "",
      priority: "",
      assignedTo: "",
      rawTags: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-semibold mb-4">Create New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm">Title</label>
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
              className="p-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm">Description</label>
            <textarea
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
              className="p-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm">Priority</label>
            <select
              name="priority"
              value={newTask.priority}
              onChange={handleInputChange}
              className="p-2 border rounded-md w-full"
              required
            >
              <option value="">Select Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm">Assigned To</label>
            <select
              name="assignedTo"
              value={newTask.assignedTo}
              onChange={handleInputChange}
              className="p-2 border rounded-md w-full"
              required
            >
              <option value="" disabled>
                Select Assignee
              </option>
              {users.map((user:any) => (
                <option key={user._id} value={user.name.toLowerCase()}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm">Tags (comma-separated)</label>
            <input
              type="text"
              name="rawTags"
              value={newTask.rawTags}
              onChange={handleInputChange}
              className="p-2 border rounded-md w-full"
              placeholder="e.g. urgent, frontend"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="p-2 border rounded-md bg-gray-200 text-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="p-2 border rounded-md bg-blue-500 text-white"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;
