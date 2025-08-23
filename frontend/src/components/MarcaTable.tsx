import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Marca } from "../services/marcaService";

interface MarcaTableProps {
  marcas: Marca[];
  onEdit: (marca: Marca) => void;
  onDelete: (id: number) => void;
}

export default function MarcaTable({ marcas, onEdit, onDelete }: MarcaTableProps) {
  const safeMarcas = Array.isArray(marcas) ? marcas : [];
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
        {safeMarcas.length > 0 ? (
          safeMarcas.map(marca => (
            <tr key={marca.id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">{marca.nombre}</td>
              <td className="py-2 px-4">{marca.descripcion}</td>
              <td className="py-2 px-4 text-center">
                <button
                  onClick={() => onEdit(marca)}
                  className="inline-flex items-center gap-1 border border-yellow-400 border-dashed text-yellow-700 bg-yellow-50 hover:bg-yellow-100 px-2 py-1 rounded text-xs mr-2 transition-colors"
                  title="Editar"
                >
                  <FaEdit className="text-yellow-600" /> Editar
                </button>
                <button
                  onClick={() => onDelete(marca.id)}
                  className="inline-flex items-center gap-1 border border-red-400 border-dashed text-red-700 bg-red-50 hover:bg-red-100 px-2 py-1 rounded text-xs transition-colors"
                  title="Eliminar"
                >
                  <FaTrash className="text-red-600" /> Eliminar
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3} className="text-center py-4 text-gray-400">No hay registros</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
