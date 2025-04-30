"use client"
import React from 'react'
import { useUser } from '../context/UserContext';

function page() {
    const { user, taskList, loading, error } = useUser();
    console.log(user, taskList, loading, error)
  return (
    <div>page</div>
  )
}

export default page