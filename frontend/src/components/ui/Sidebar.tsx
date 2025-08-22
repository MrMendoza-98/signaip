import React from "react";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-50 border-r flex flex-col p-4 fixed left-0 top-0">
      <h2 className="text-lg font-bold mb-6">SignaIP</h2>
      <nav className="flex flex-col gap-4">
        <a href="#" className="text-gray-700 hover:text-blue-600">Marcas</a>
        {/* Agrega más enlaces aquí */}
      </nav>
    </aside>
  );
}
