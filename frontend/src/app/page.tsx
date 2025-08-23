

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
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<{nombre?: string; descripcion?: string}>({});
  const [successMsg, setSuccessMsg] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let newErrors: {nombre?: string; descripcion?: string} = {};
    if (step === 1) {
      if (!nombre.trim()) {
        newErrors.nombre = "El nombre de la marca es obligatorio.";
      } else if (!/^[\w\sáéíóúÁÉÍÓÚñÑ-]+$/.test(nombre)) {
        newErrors.nombre = "Solo se permiten letras, números y espacios.";
      }
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      setErrors({});
      setStep(2);
      return;
    }
    if (step === 2) {
      // Validación descripción
      if (!descripcion.trim()) {
        newErrors.descripcion = "La descripción es obligatoria.";
      } else if (descripcion.length < 5) {
        newErrors.descripcion = "La descripción debe tener al menos 5 caracteres.";
      }
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      setErrors({});
      setStep(3);
      return;
    }
    // Paso final: guardar
    if (editId === null) {
      addMarca(nombre, descripcion);
      setSuccessMsg("Marca registrada exitosamente.");
    } else {
      editMarca(editId, nombre, descripcion);
      setEditId(null);
      setSuccessMsg("Marca actualizada exitosamente.");
    }
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setSuccessMsg("");
    }, 2000);
    setNombre("");
    setDescripcion("");
    setShowForm(false);
    setStep(1);
  };

  const handleEdit = (marca: { id: number; nombre: string; descripcion: string }) => {
    setEditId(marca.id);
    setNombre(marca.nombre);
    setDescripcion(marca.descripcion);
    setShowForm(true);
    setStep(1);
    setSuccessMsg("");
  };

  const handleDelete = (id: number) => {
    removeMarca(id);
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setNombre("");
    setDescripcion("");
    setShowForm(false);
    setStep(1);
    setSuccessMsg("");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white border-r flex flex-col p-4">
        <h2 className="text-lg font-bold mb-6">Panel</h2>
        <nav className="flex flex-col gap-2">
          <span className="mt-4 text-xs text-gray-500">Servicios</span>
          <a href="#" className="text-red-600 font-semibold bg-red-100 rounded px-2 py-1">Registro de Marca</a>
        </nav>
      </aside>
      <div className="flex-1 ml-64">
        <div className="px-8 pt-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Marcas</h1>
              <Breadcrumbs items={["Inicio", "Marcas"]} />
            </div>
            <div className="flex justify-end mb-4">
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded shadow"
                onClick={() => setShowForm(true)}
              >
                Nuevo Registro
              </button>
            </div>
          </div>
          {showForm && (
            <div className="fixed inset-0 bg-black/50 bg-opacity-30 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded shadow w-full max-w-lg relative">
                <h2 className="text-xl font-bold mb-4 text-center">Servicios/Registro de Marca</h2>
                {/* Pasos visuales */}
                <div className="flex justify-center items-center gap-4 mb-6">
                  <div className="flex flex-col items-center">
                    <span className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${step === 1 ? 'bg-red-500 text-white' : 'border-2 border-gray-400 text-gray-700'}`}>1</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${step === 2 ? 'bg-red-500 text-white' : 'border-2 border-gray-400 text-gray-700'}`}>2</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-400 text-gray-700 font-bold">3</span>
                  </div>
                </div>
                <div className="text-center font-semibold mb-4">Información de la Marca</div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {step === 1 && (
                    <label className="flex flex-col gap-2 items-center w-full">
                      <span className="font-medium">Marca a Registrar</span>
                      <input
                        type="text"
                        placeholder="Nombre de la marca"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                        className={`border p-2 rounded w-64 text-center ${errors.nombre ? 'border-red-500' : ''}`}
                        required
                      />
                      {errors.nombre && <span className="text-red-500 text-sm mt-1">{errors.nombre}</span>}
                    </label>
                  )}
                  {step === 2 && (
                    <label className="flex flex-col gap-2 items-center w-full">
                      <span className="font-medium">Descripción de la Marca</span>
                      <input
                        type="text"
                        placeholder="Descripción"
                        value={descripcion}
                        onChange={e => setDescripcion(e.target.value)}
                        className={`border p-2 rounded w-64 text-center ${errors.descripcion ? 'border-red-500' : ''}`}
                        required
                      />
                      {errors.descripcion && <span className="text-red-500 text-sm mt-1">{errors.descripcion}</span>}
                    </label>
                  )}
                  {step === 1 && (
                    <div className="flex justify-end">
                      <button type="submit" className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-8 rounded shadow">
                        Continuar --&gt;
                      </button>
                    </div>
                  )}
                  {step === 2 && (
                    <div className="flex justify-between">
                      <button type="button" className="bg-gray-400 text-white font-bold py-2 px-8 rounded shadow" onClick={() => setStep(1)}>
                        Volver
                      </button>
                      <button type="submit" className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-8 rounded shadow">
                        Continuar --&gt;
                      </button>
                    </div>
                  )}
                  {step === 3 && (
                    <div className="flex flex-col gap-4 items-center">
                      <div className="w-full bg-gray-100 rounded p-4 mb-2">
                        <div className="mb-2"><span className="font-semibold">Marca:</span> {nombre}</div>
                        <div><span className="font-semibold">Descripción:</span> {descripcion}</div>
                      </div>
                      <div className="flex justify-between w-full">
                        <button type="button" className="bg-gray-400 text-white font-bold py-2 px-8 rounded shadow" onClick={() => setStep(2)}>
                          Volver
                        </button>
                        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-8 rounded shadow">
                          Guardar
                        </button>
                      </div>
                    </div>
                  )}
                </form>
                <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl" onClick={handleCancelEdit}>&times;</button>
              </div>
            </div>
          )}
          {/* Toast notification */}
          {showToast && successMsg && (
            <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-[100] bg-green-600 text-white px-6 py-3 rounded shadow-lg font-semibold animate-fade-in transition-all duration-300">
              {successMsg}
            </div>
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
