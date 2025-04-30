"use client";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import CreateTaskModal from "@/component/Modal/CreateTaskModal";
import axios from "axios";
import TaskCard from "@/component/Cards/TaskCard";

function Page() {
  interface Task {
    title: string;
    description: string;
    assignedTo: string;
    priority: string;
    tags: string[];
    createdAt: string;
  }
  
  const [tasks, setTasks] = useState<any[]>([]);
  const { user, taskList } = useContext(UserContext);
  console.log(user);
  useEffect(() => {
    setTasks(taskList || []);
  }, [taskList]);

  const [filters, setFilters] = useState({
    tag: "",
    priority: "",
    assignedTo: "",
  });

  const [sortBy, setSortBy] = useState("createdAt");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTasks = tasks.filter((task: any) => {
    return (
      (filters.tag ? task.tags.includes(filters.tag) : true) &&
      (filters.priority ? task.priority === filters.priority : true) &&
      (filters.assignedTo ? task.assignedTo === filters.assignedTo : true)
    );
  });

  const sortedTasks = filteredTasks.sort((a: any, b: any) => {
    if (sortBy === "priority") {
      return a.priority.localeCompare(b.priority);
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handleCreateTask = (task: any) => {
    console.log("Created Task:", task);

    axios.post("/api/task", task).then((response) => {
      alert("Task created successfully!");
      setTasks((prevTasks) => [...prevTasks, response.data]);
    });
    // Send to backend or update state
  };

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = sortedTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(sortedTasks.length / tasksPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-10">
      {/* Filter & Sort */}
      <div className="mb-5 flex gap-4 w-full justify-around items-baseline">
        <select
          name="tag"
          onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
          className="p-2 border rounded-md"
        >
          <option value="">Filter by Tag</option>
          <option value="assignment">Assignment</option>
          <option value="urgent">Urgent</option>
          <option value="documentation">Documentation</option>
        </select>
        <select
          name="priority"
          onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
          className="p-2 border rounded-md"
        >
          <option value="">Filter by Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select
          name="assignedTo"
          onChange={(e) =>
            setFilters({ ...filters, assignedTo: e.target.value })
          }
          className="p-2 border rounded-md"
        >
          <option value="">Filter by Assignee</option>
          {user?.map((u: any) => (
            <option key={u._id} value={u.name.toLowerCase()}>
              {u.name}
            </option>
          ))}
        </select>
        <select
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="createdAt">Sort by Date</option>
          <option value="priority">Sort by Priority</option>
        </select>
        <button
          className="p-2 border rounded-md"
          onClick={() => setFilters({ tag: "", priority: "", assignedTo: "" })}
        >
          Clear All X
        </button>
        <button
          className="p-2 border rounded-md bg-blue-500 text-white"
          onClick={() => setIsModalOpen(true)}
        >
          Create Task
        </button>
      </div>

      {/* Tasks List */}
      <div className="gap-10 space-y-4">
        {currentTasks.length === 0 ? (
          <p className="text-center text-gray-500">
            No tasks match the applied filters.
          </p>
        ) : (
          currentTasks.map((task: any, index: number) => (
            <TaskCard task={task} key={index}></TaskCard>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="mt-5 flex justify-center items-center gap-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 border rounded-md bg-gray-300 text-gray-600 hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`p-2 border rounded-md ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 border rounded-md bg-gray-300 text-gray-600 hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Task Creation Modal */}
      {isModalOpen && (
        <CreateTaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreateTask}
          users={user || []}
        />
      )}
    </div>
  );
}

export default Page;
