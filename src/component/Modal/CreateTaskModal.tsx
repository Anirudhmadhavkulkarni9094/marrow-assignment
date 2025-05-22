import { UserContext } from "@/app/context/UserContext";
import React, { useContext, useState } from "react";

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
    rawTags: "",
  });

  const { isDarkMode } = useContext(UserContext);

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
      <div
        className={`p-8 rounded-lg shadow-lg max-w-lg w-full ${
          isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
        }`}
      >
        <h2 className="text-2xl font-semibold mb-4">Create New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm">Title</label>
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
              className={`p-2 border rounded-md w-full ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              required
              placeholder="Enter task title"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm">Description</label>
            <textarea
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
              className={`p-2 border rounded-md w-full resize-y ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              required
              placeholder="Enter task description"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm">Priority</label>
            <select
              name="priority"
              value={newTask.priority}
              onChange={handleInputChange}
              className={`p-2 border rounded-md w-full ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-gray-100"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
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
              className={`p-2 border rounded-md w-full ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-gray-100"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
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
              placeholder="e.g. urgent, frontend"
              className={`p-2 border rounded-md w-full ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className={`p-2 border rounded-md ${
                isDarkMode
                  ? "bg-gray-600 text-gray-300 border-gray-600 hover:bg-gray-700"
                  : "bg-gray-200 text-gray-600 border-gray-300 hover:bg-gray-300"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="p-2 border rounded-md bg-blue-500 text-white hover:bg-blue-600"
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
