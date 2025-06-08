import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Kanban from "./pages/Kanban";
import Calendar from "./pages/Calendar";
import Charts from "./pages/Charts";
import Tables from "./pages/Tables";
import Sidebar from "./layout/Sidebar";
import Navbar from "./layout/Navbar";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <div className="flex h-screen">
        <Router>
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Navbar />
            <main className="p-4 flex-1 overflow-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/kanban" element={<Kanban />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/charts" element={<Charts />} />
                <Route path="/tables" element={<Tables />} />
              </Routes>
            </main>
          </div>
        </Router>
      </div>
    </ThemeProvider>
  );
}