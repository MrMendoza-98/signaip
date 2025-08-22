import React from "react";
import { Marca } from "../services/marcaService";

interface MarcaTableProps {
  marcas: Marca[];
  onEdit: (marca: Marca) => void;
  onDelete: (id: number) => void;
}

export default function MarcaTable({ marcas, onEdit, onDelete }: MarcaTableProps) {
  return (
    <table className="w-full bg-white rounded shadow mt-4">
      <thead>
        <tr className="border-b">
          <th className="py-2 px-4 text-left">Nombre</th>
          <th className="py-2 px-4 text-left">Descripción</th>
          <th className="py-2 px-4 text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {marcas.map(marca => (
          <tr key={marca.id} className="border-b hover:bg-gray-50">
            <td className="py-2 px-4">{marca.nombre}</td>
            <td className="py-2 px-4">{marca.descripcion}</td>
            <td className="py-2 px-4 text-center">
              <button onClick={() => onEdit(marca)} className="text-yellow-600 hover:underline mr-2">Editar</button>
              <button onClick={() => onDelete(marca.id)} className="text-red-600 hover:underline">Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
