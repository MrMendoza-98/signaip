"use client";
export type Marca = {
  id: number;
  nombre: string;
  descripcion: string;
};

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/marcas`;

export async function getMarcas(): Promise<Marca[]> {
  const res = await fetch(`${API_URL}`);
  return res.json();
}

export async function createMarca(nombre: string, descripcion: string): Promise<Marca> {
  const res = await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, descripcion }),
  });
  return res.json();
}

export async function updateMarca(id: number, nombre: string, descripcion: string): Promise<Marca> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, descripcion }),
  });
  return res.json();
}

export async function deleteMarca(id: number): Promise<void> {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}
