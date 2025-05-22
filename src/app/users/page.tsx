"use client";
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext"; // Adjust path to UserContext
import TaskCard from "@/component/Cards/TaskCard";

function Page() {
  const { user, taskList, loading, error, isDarkMode } = useContext(UserContext);

  const [currentUser, setCurrentUser] = useState<string>("");
  const [filteredTasks, setFilteredTasks] = useState<any[]>([]);

  useEffect(() => {
    if (currentUser && taskList) {
      const filtered = taskList.filter(
        (task) => task.assignedTo.toLowerCase().trim() === currentUser.toLowerCase().trim()
      );
      setFilteredTasks(filtered);
    } else {
      setFilteredTasks([]);
    }
  }, [currentUser, taskList]);

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentUser(event.target.value);
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">Error: {error}</div>;
  }

  return (
    <div className={`${isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"} p-6 min-h-screen`}>
      <h1 className="text-3xl font-extrabold mb-10 text-center text-blue-800 dark:text-blue-400">
        User Directory & Tasks
      </h1>

      {/* User Filter Dropdown */}
      <div className="flex justify-center mb-10">
        <select
          aria-label="Select user to filter tasks"
          value={currentUser}
          onChange={handleUserChange}
          className={`p-3 rounded-md border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 ${
            isDarkMode
              ? "bg-gray-700 border-gray-600 text-gray-100"
              : "bg-white border-gray-300 text-gray-900"
          }`}
        >
          <option value="">Select a User</option>
          {user &&
            user.map((userItem) => (
              <option key={userItem._id} value={userItem.name}>
                {userItem.name}
              </option>
            ))}
        </select>
      </div>

      {/* User Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {user &&
          user.map((userItem) => (
            <article
              key={userItem._id}
              className={`rounded-xl p-6 shadow-md border transition-all duration-300 hover:shadow-lg ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-3">{userItem.name}</h2>
              <p className="text-sm mb-2">
                📧 <span className="font-medium">Email:</span> {userItem.email}
              </p>
              <p className="text-sm mb-2">
                🛠️ <span className="font-medium">Role:</span> {userItem.role}
              </p>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium">Status:</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    userItem.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {userItem.status}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                <span className="font-medium">Created:</span>{" "}
                {new Date(userItem.createdAt).toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                <span className="font-medium">Updated:</span>{" "}
                {new Date(userItem.updatedAt).toLocaleDateString()}
              </p>
            </article>
          ))}
      </div>

      {/* Filtered Tasks */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-center">
          Tasks Assigned to:{" "}
          <span className="text-blue-600 dark:text-blue-400">
            {currentUser || "No User Selected"}
          </span>
        </h2>

        {filteredTasks.length > 0 ? (
          <div className="space-y-6">
            {filteredTasks.map((task) => (
              <TaskCard task={task} key={task._id} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-6 text-lg">
            No tasks assigned to this user.
          </p>
        )}
      </section>
    </div>
  );
}

export default Page;
