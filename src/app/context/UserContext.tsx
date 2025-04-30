"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type User = {
  map(arg0: (userItem: any) => React.JSX.Element): React.ReactNode;
  id: string;
  name: string;
};

type Task = {
  assignedTo: string;
  id: string;
  title: string;
  completed: boolean;
  // Add other fields if needed
};

interface UserContextType {
  user: User | null;
  taskList: Task[] | null;
  loading: boolean;
  error: string | null;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  taskList: null,
  loading: true,
  error: null,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [taskList, setTaskList] = useState<Task[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user");
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch user");
        setUser(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong while fetching user");
      }
    };

    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/task");
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch tasks");
        setTaskList(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong while fetching tasks");
      }
    };

    fetchUser();
    fetchTasks();
  }, []);

  useEffect(() => {
    if (user && taskList) {
      setLoading(false);
    }
  }, [user, taskList]);

  return (
    <UserContext.Provider value={{ user, taskList, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
