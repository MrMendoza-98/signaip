import React from "react";

type Marca = {
  id: number;
  nombre: string;
  descripcion: string;
};

interface MarcaListProps {
  marcas: Marca[];
  onEdit: (marca: Marca) => void;
  onDelete: (id: number) => void;
}

export default function MarcaList({ marcas, onEdit, onDelete }: MarcaListProps) {
  return (
    <ul className="space-y-4">
      {marcas.map(marca => (
        <li key={marca.id} className="border p-4 rounded flex justify-between items-center bg-white shadow">
          <div>
            <span className="font-semibold">{marca.nombre}</span>
            <span className="block text-sm text-gray-600">{marca.descripcion}</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => onEdit(marca)} className="bg-yellow-400 px-2 py-1 rounded">Editar</button>
            <button onClick={() => onDelete(marca.id)} className="bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
