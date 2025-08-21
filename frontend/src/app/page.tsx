

"use client";
import { useEffect, useState } from "react";
import MarcaForm from "../components/MarcaForm";
import MarcaList from "../components/MarcaList";

type Marca = {
  id: number;
  nombre: string;
  descripcion: string;
};

const API_URL = "http://127.0.0.1:8000/marcas";

export default function Home() {
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  // Fetch marcas
  const fetchMarcas = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setMarcas(data);
  };

  useEffect(() => {
    fetchMarcas();
  }, []);

  // Create or update marca
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId === null) {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, descripcion }),
      });
    } else {
      await fetch(`${API_URL}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, descripcion }),
      });
      setEditId(null);
    }
    setNombre("");
    setDescripcion("");
    fetchMarcas();
  };

  // Delete marca
  const handleDelete = async (id: number) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchMarcas();
  };

  // Edit marca
  const handleEdit = (marca: Marca) => {
    setEditId(marca.id);
    setNombre(marca.nombre);
    setDescripcion(marca.descripcion);
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setNombre("");
    setDescripcion("");
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">CRUD de Marcas</h1>
      <MarcaForm
        nombre={nombre}
        descripcion={descripcion}
        onNombreChange={setNombre}
        onDescripcionChange={setDescripcion}
        onSubmit={handleSubmit}
        editId={editId}
        onCancelEdit={handleCancelEdit}
      />
      <MarcaList
        marcas={marcas}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
