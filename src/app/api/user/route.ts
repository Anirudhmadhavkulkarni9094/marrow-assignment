import { NextResponse } from 'next/server';
import connectToDatabase from "../../../lib/mongodb"
import User from '@/models/User';

// GET /api/users → fetch all users
export async function GET() {
  await connectToDatabase();
  try {
    const users = await User.find({});
    return NextResponse.json(users, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Error fetching users', error: error.message }, { status: 500 });
  }
}

// POST /api/users → create a new user
export async function POST(req: Request) {
  await connectToDatabase();
  try {
    const { name, email, role, status, createdAt, updatedAt } = await req.json();

    if (!name || !email || !role || !status || !createdAt || !updatedAt) {
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    const newUser = await User.create({
      name,
      email,
      role,
      status,
      createdAt,
      updatedAt,
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to create user.', error: error.message }, { status: 500 });
  }
}
