import { useState } from "react";
import { ChevronDown, ChevronUp, User, Tag, AlertCircle } from "lucide-react";

export default function TaskCard({ task }: { task: any }) {
  const [isOpen, setIsOpen] = useState(false);

  const priorityColors: Record<string, string> = {
    High: "bg-red-100 text-red-600",
    Medium: "bg-yellow-100 text-yellow-600",
    Low: "bg-green-100 text-green-600",
  };

  return (
    <div key={task._id} className="bg-white shadow-lg rounded-xl p-5 mb-5 transition-all duration-300 hover:shadow-xl">
      <button
        className="w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-xl text-gray-800">{task.title}</h3>
          {isOpen ? (
            <ChevronUp className="text-gray-500 w-5 h-5 cursor-pointer" />
          ) : (
            <ChevronDown className="text-gray-500 w-5 h-5 cursor-pointer" />
          )}
        </div>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{task.description}</p>
      </button>

      {isOpen && (
        <div className="mt-4 border-t pt-4 text-sm text-gray-700 space-y-3">
          <p className="flex items-center gap-2">
            <AlertCircle size={16} />
            <span><strong>Description:</strong> {task.description}</span>
          </p>
          <p className="flex items-center gap-2">
            <User size={16} />
            <span><strong>Assigned to:</strong> {task.assignedTo}</span>
          </p>
          <p className="flex items-center gap-2">
            <AlertCircle size={16} />
            <span><strong>Priority:</strong> 
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${priorityColors[task.priority] || "bg-gray-100 text-gray-600"}`}>
                {task.priority}
              </span>
            </span>
          </p>
          <div className="flex items-start gap-2">
            <Tag size={16} className="mt-1" />
            <div className="flex flex-wrap gap-2">
              {task.tags.map((tag: string, i: number) => (
                <span
                  key={i}
                  className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
