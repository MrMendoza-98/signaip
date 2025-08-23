

"use client";

import { useState } from "react";
import { useMarcaForm } from "../hooks/useMarcaForm";
import { useMarcas } from "../hooks/useMarcas";

import { FaPlus, FaTrademark, FaHome } from "react-icons/fa";
import Toast from "../components/Toast";
import MarcaStepperModal from "../components/MarcaStepperModal";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import MarcaTable from "../components/MarcaTable";

export default function Home() {
  const { marcas, addMarca, editMarca, removeMarca, loading, error } = useMarcas();
  const [showForm, setShowForm] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [showToast, setShowToast] = useState(false);
  const marcaForm = useMarcaForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!marcaForm.validateStep()) return;
    if (marcaForm.step < 3) {
      marcaForm.nextStep();
      return;
    }
    // Paso final: guardar
    if (marcaForm.editId === null) {
      addMarca(marcaForm.nombre, marcaForm.descripcion);
      setSuccessMsg("Marca registrada exitosamente.");
    } else {
      editMarca(marcaForm.editId, marcaForm.nombre, marcaForm.descripcion);
      setSuccessMsg("Marca actualizada exitosamente.");
      marcaForm.setEditId(null);
    }
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setSuccessMsg("");
    }, 2000);
    marcaForm.resetForm();
    setShowForm(false);
  };

  const handleEdit = (marca: { id: number; nombre: string; descripcion: string }) => {
    marcaForm.setEditId(marca.id);
    marcaForm.setNombre(marca.nombre);
    marcaForm.setDescripcion(marca.descripcion);
    marcaForm.setStep(1);
    setShowForm(true);
    setSuccessMsg("");
  };

  const handleDelete = (id: number) => {
    removeMarca(id);
  };

  const handleCancelEdit = () => {
    marcaForm.resetForm();
    setShowForm(false);
    setSuccessMsg("");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar: visible solo en md+ */}
      <aside className="w-64 bg-white border-r flex-col p-4 hidden md:flex md:fixed md:h-full md:z-40">
        <h2 className="text-lg font-bold mb-6 flex items-center gap-2"><FaHome className="inline mr-2" />Panel</h2>
        <nav className="flex flex-col gap-2">
          <span className="mt-4 text-xs text-gray-500">Servicios</span>
          <a href="#" className="text-red-600 font-semibold bg-red-100 rounded px-2 py-1 flex items-center gap-2"><FaTrademark /> Registro de Marca</a>
        </nav>
      </aside>
      <div className="flex-1 md:ml-64">
        <div className="px-2 pt-4 md:px-8 md:pt-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Marcas</h1>
              <Breadcrumbs items={["Inicio", "Marcas"]} />
            </div>
            <div className="flex justify-end mb-4">
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded shadow flex items-center gap-2"
                onClick={() => setShowForm(true)}
              >
                <FaPlus /> Nuevo Registro
              </button>
            </div>
          </div>
          <MarcaStepperModal
            show={showForm}
            step={marcaForm.step}
            nombre={marcaForm.nombre}
            descripcion={marcaForm.descripcion}
            errors={marcaForm.errors}
            onNombreChange={marcaForm.setNombre}
            onDescripcionChange={marcaForm.setDescripcion}
            onSubmit={handleSubmit}
            onStepChange={marcaForm.setStep}
            onCancel={handleCancelEdit}
          />
          <Toast show={showToast} message={successMsg} />
          {error && <div className="mb-4 text-red-600">{error}</div>}
          {loading ? (
            <div className="text-center py-4">Cargando...</div>
          ) : (
            <div className="overflow-x-auto">
              <MarcaTable marcas={marcas} onEdit={handleEdit} onDelete={handleDelete} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
