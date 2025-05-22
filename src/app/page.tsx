"use client";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-24 bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to TaskFlow</h1>
        <p className="text-lg md:text-xl max-w-2xl mb-6">
          Simplify your task management. Assign tasks, set priorities, and track progress in one place.
        </p>
        <Link href="/tasks">
          <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition">
            Go to Dashboard
          </button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-12">Why TaskFlow?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Easy Assignment</h3>
            <p>Assign tasks to team members effortlessly with priority and tags.</p>
          </div>
          <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
            <p>Keep track of tasks and ensure timely completion with status updates.</p>
          </div>
          <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Manage Teams</h3>
            <p>Organize tasks by user and gain insights with smart filters and dashboards.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-500">
        © {new Date().getFullYear()} TaskFlow. All rights reserved.
      </footer>
    </>
  );
}
