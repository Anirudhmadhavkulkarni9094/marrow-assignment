import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb'; // Import the connectToDatabase function
import Task from '../../../models/tasks'; // Import the Task Mongoose model

// Handle POST request to create a new task

export async function GET() {
  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Fetch all tasks from the database
    const tasks = await Task.find({});

    return NextResponse.json(tasks, { status: 200 });
  } catch (error:any) {
    return NextResponse.json(
      { message: 'Error fetching tasks', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req:any) {
  try {
    // Connect to MongoDB
    await connectToDatabase();

    const { title, description, priority, assignedTo, tags } = await req.json();

    // Check if all required fields are provided
    if (!title || !description || !priority || !assignedTo) {
      return NextResponse.json(
        { message: 'All fields are required.' },
        { status: 400 }
      );
    }

    // Create a new task instance
    const newTask = new Task({
      title,
      description,
      priority,
      assignedTo,
      tags: tags || [],
    });

    // Save the new task to the database
    await newTask.save();

    return NextResponse.json(newTask, { status: 201 });
  } catch (error:any) {
    return NextResponse.json(
      { message: 'Failed to create task.', error: error.message },
      { status: 500 }
    );
  }
}
