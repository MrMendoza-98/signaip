import { useState, useEffect } from "react";
import { Marca, getMarcas, createMarca, updateMarca, deleteMarca } from "../services/marcaService";

export function useMarcas() {
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMarcas = async () => {
    setLoading(true);
    try {
      const data = await getMarcas();
      setMarcas(data);
      setError(null);
    } catch (err) {
      setError("Error al cargar marcas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarcas();
  }, []);

  const addMarca = async (nombre: string, descripcion: string) => {
    setLoading(true);
    try {
      await createMarca(nombre, descripcion);
      fetchMarcas();
    } catch (err) {
      setError("Error al crear marca");
    } finally {
      setLoading(false);
    }
  };

  const editMarca = async (id: number, nombre: string, descripcion: string) => {
    setLoading(true);
    try {
      await updateMarca(id, nombre, descripcion);
      fetchMarcas();
    } catch (err) {
      setError("Error al actualizar marca");
    } finally {
      setLoading(false);
    }
  };

  const removeMarca = async (id: number) => {
    setLoading(true);
    try {
      await deleteMarca(id);
      fetchMarcas();
    } catch (err) {
      setError("Error al eliminar marca");
    } finally {
      setLoading(false);
    }
  };

  return { marcas, loading, error, addMarca, editMarca, removeMarca };
}
