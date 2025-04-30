"use client";
import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/UserContext'; // Adjust path to UserContext
import TaskCard from '@/component/TaskCard';

function Page() {
  const { user, taskList, loading, error } = useContext(UserContext);

  const [currentUser, setCurrentUser] = useState<string>("");
  const [filteredTasks, setFilteredTasks] = useState<any[]>([]);

  // When user or taskList changes, filter the tasks based on selected user
  useEffect(() => {
    if (currentUser && taskList) {
      const selectedUser = taskList.find((task) => task.assignedTo === currentUser);
      if (selectedUser) {
        const filtered = taskList.filter(
          (task) => task.assignedTo.toLowerCase() === currentUser.toLowerCase()
        );
        setFilteredTasks(filtered);
      }
    } else {
      setFilteredTasks([]);
    }
  }, [currentUser, taskList]);

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentUser(event.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-10 text-center text-blue-800">User Directory & Tasks</h1>

      {/* User Filter Dropdown */}
      <div className="flex justify-center mb-10">
        <select
          value={currentUser}
          onChange={handleUserChange}
          className="p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 bg-white"
        >
          <option value="" >Select a User</option>
          {user && user.map((userItem) => (
            <option key={userItem._id} value={userItem.name}>
              {userItem.name}
            </option>
          ))}
        </select>
      </div>

      {/* User Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {user && user.map((userItem) => (
          <div
            key={userItem._id}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg border border-gray-200 transition-all duration-300"
          >
            <h2 className="text-2xl font-semibold text-blue-700 mb-3">{userItem.name}</h2>
            <p className="text-sm text-gray-600 mb-2">
              📧 <span className="font-medium">Email:</span> {userItem.email}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              🛠️ <span className="font-medium">Role:</span> {userItem.role}
            </p>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium">Status:</span>
              <span className={`px-2 py-1 rounded-full text-xs ${userItem.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {userItem.status}
              </span>
            </div>
            <p className="text-xs text-gray-500"><span className="font-medium">Created:</span> {userItem.createdAt}</p>
            <p className="text-xs text-gray-500"><span className="font-medium">Updated:</span> {userItem.updatedAt}</p>
          </div>
        ))}
      </div>

      {/* Filtered Tasks */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">
          Tasks Assigned to:{" "}
          <span className="text-blue-600">
            {currentUser || "No User Selected"}
          </span>
        </h2>

        {filteredTasks.length > 0 ? (
          <div className=" gap-8">
            {filteredTasks.map((task) => (
              <TaskCard task={task} key={task._id}/>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-6 text-lg">No tasks assigned to this user.</p>
        )}
      </div>
    </div>
  );
}

export default Page;
