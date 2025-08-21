import React from "react";

interface MarcaFormProps {
  nombre: string;
  descripcion: string;
  onNombreChange: (value: string) => void;
  onDescripcionChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  editId: number | null;
  onCancelEdit: () => void;
}

export default function MarcaForm({
  nombre,
  descripcion,
  onNombreChange,
  onDescripcionChange,
  onSubmit,
  editId,
  onCancelEdit,
}: MarcaFormProps) {
  return (
    <form onSubmit={onSubmit} className="mb-8 flex flex-col gap-4 bg-white p-6 rounded shadow">
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={e => onNombreChange(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="Descripción"
        value={descripcion}
        onChange={e => onDescripcionChange(e.target.value)}
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {editId === null ? "Crear Marca" : "Actualizar Marca"}
      </button>
      {editId !== null && (
        <button type="button" onClick={onCancelEdit} className="bg-gray-400 text-white px-4 py-2 rounded">Cancelar edición</button>
      )}
    </form>
  );
}
