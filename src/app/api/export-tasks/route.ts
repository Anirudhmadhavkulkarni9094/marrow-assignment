// /app/api/export-tasks/route.ts
import { NextResponse } from 'next/server';

interface Task {
  title: string;
  description: string;
  assignedTo: string;
  priority: string;
  tags?: string[];
}

function escapeCSV(value: string | null | undefined): string {
  if (!value) return '';
  return `"${value.replace(/"/g, '""')}"`; // escape double quotes
}

function generateCSV(tasks: Task[]): string {
  const headers = ['Title', 'Description', 'Assigned To', 'Priority', 'Tags'];
  const csvRows = [headers.join(',')];

  for (const task of tasks) {
    const row = [
      escapeCSV(task.title),
      escapeCSV(task.description),
      escapeCSV(task.assignedTo),
      escapeCSV(task.priority),
      escapeCSV((task.tags || []).join('; '))
    ];
    csvRows.push(row.join(','));
  }

  return csvRows.join('\n');
}

export async function POST(req: Request) {
  try {
    const { tasks } = await req.json();

    if (!Array.isArray(tasks)) {
      return NextResponse.json({ error: 'Invalid task data' }, { status: 400 });
    }
    console.log(tasks);

    const csv = generateCSV(tasks);

    return new Response(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="all-tasks.csv"',
      },
    });
  } catch (err) {
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
