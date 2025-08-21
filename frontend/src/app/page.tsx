

"use client";
import { useState } from "react";
import MarcaForm from "../components/MarcaForm";
import MarcaList from "../components/MarcaList";
import { useMarcas } from "../hooks/useMarcas";

export default function Home() {
  const { marcas, addMarca, editMarca, removeMarca, loading, error } = useMarcas();
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
  };

  const handleEdit = (marca: { id: number; nombre: string; descripcion: string }) => {
    setEditId(marca.id);
    setNombre(marca.nombre);
    setDescripcion(marca.descripcion);
  };

  const handleDelete = (id: number) => {
    removeMarca(id);
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setNombre("");
    setDescripcion("");
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">CRUD de Marcas</h1>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <MarcaForm
        nombre={nombre}
        descripcion={descripcion}
        onNombreChange={setNombre}
        onDescripcionChange={setDescripcion}
        onSubmit={handleSubmit}
        editId={editId}
        onCancelEdit={handleCancelEdit}
      />
      {loading ? (
        <div className="text-center py-4">Cargando...</div>
      ) : (
        <MarcaList
          marcas={marcas}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
