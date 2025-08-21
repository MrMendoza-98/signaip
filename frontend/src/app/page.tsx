
"use client";
import { useEffect, useState } from "react";

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

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">CRUD de Marcas</h1>
      <form onSubmit={handleSubmit} className="mb-8 flex flex-col gap-4">
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
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editId === null ? "Crear Marca" : "Actualizar Marca"}
        </button>
        {editId !== null && (
          <button type="button" onClick={() => { setEditId(null); setNombre(""); setDescripcion(""); }} className="bg-gray-400 text-white px-4 py-2 rounded">Cancelar edición</button>
        )}
      </form>
      <ul className="space-y-4">
        {marcas.map(marca => (
          <li key={marca.id} className="border p-4 rounded flex justify-between items-center">
            <div>
              <span className="font-semibold">{marca.nombre}</span>
              <span className="block text-sm text-gray-600">{marca.descripcion}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(marca)} className="bg-yellow-400 px-2 py-1 rounded">Editar</button>
              <button onClick={() => handleDelete(marca.id)} className="bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
