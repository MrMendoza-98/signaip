

"use client";

import { useState } from "react";
import { useMarcas } from "../hooks/useMarcas";

import Sidebar from "../components/ui/Sidebar";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import MarcaTable from "../components/MarcaTable";
import { Button } from "../components/ui/button";

export default function Home() {
  const { marcas, addMarca, editMarca, removeMarca, loading, error } = useMarcas();
  const [showForm, setShowForm] = useState(false);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId === null) {
      addMarca(nombre, descripcion);
    } else {
      editMarca(editId, nombre, descripcion);
      setEditId(null);
    }
    setNombre("");
    setDescripcion("");
    setShowForm(false);
  };

  const handleEdit = (marca: { id: number; nombre: string; descripcion: string }) => {
    setEditId(marca.id);
    setNombre(marca.nombre);
    setDescripcion(marca.descripcion);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    removeMarca(id);
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setNombre("");
    setDescripcion("");
    setShowForm(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 ml-64">
        <div className="px-8 pt-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Marcas</h1>
              <Breadcrumbs items={["Inicio", "Marcas"]} />
            </div>
            <Button
              variant="default"
              onClick={() => { setShowForm(true); setEditId(null); setNombre(""); setDescripcion(""); }}
            >
              Agregar Marca
            </Button>
          </div>
          {showForm && (
            <form onSubmit={handleSubmit} className="mb-8 flex flex-col gap-4 bg-white p-6 rounded shadow max-w-md">
              <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Descripción"
                value={descripcion}
                onChange={e => setDescripcion(e.target.value)}
                className="border p-2 rounded"
              />
              <div className="flex gap-2">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                  {editId === null ? "Crear Marca" : "Actualizar Marca"}
                </button>
                <button type="button" onClick={handleCancelEdit} className="bg-gray-400 text-white px-4 py-2 rounded">Cancelar</button>
              </div>
            </form>
          )}
          {error && <div className="mb-4 text-red-600">{error}</div>}
          {loading ? (
            <div className="text-center py-4">Cargando...</div>
          ) : (
            <MarcaTable marcas={marcas} onEdit={handleEdit} onDelete={handleDelete} />
          )}
        </div>
      </div>
    </div>
  );
}
