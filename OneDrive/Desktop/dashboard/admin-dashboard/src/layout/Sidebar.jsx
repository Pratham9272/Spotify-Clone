import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Calendar, LayoutDashboard, KanbanSquare, BarChart3, Table } from "lucide-react";

const links = [
  { to: "/", name: "Dashboard", icon: <LayoutDashboard /> },
  { to: "/kanban", name: "Kanban", icon: <KanbanSquare /> },
  { to: "/calendar", name: "Calendar", icon: <Calendar /> },
  { to: "/charts", name: "Charts", icon: <BarChart3 /> },
  { to: "/tables", name: "Tables", icon: <Table /> },
];

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="w-64 h-screen bg-gradient-to-b from-blue-700 to-blue-800 text-white shadow-lg p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Admin Panel</h2>
      <nav className="flex flex-col space-y-2">
        {links.map(({ to, name, icon }) => (
          <Link
            key={name}
            to={to}
            className={`flex items-center gap-3 px-4 py-2 rounded-md transition duration-200 hover:bg-blue-600 ${
              pathname === to ? "bg-blue-600" : ""
            }`}
          >
            {icon}
            <span className="text-sm">{name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
