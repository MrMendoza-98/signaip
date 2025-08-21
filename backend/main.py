from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import sqlite3

app = FastAPI()

# Database setup
DB_NAME = "marcas.db"

def init_db():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS marcas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        descripcion TEXT
    )
    """)
    conn.commit()
    conn.close()

init_db()

class Marca(BaseModel):
    nombre: str
    descripcion: str = ""

class MarcaOut(Marca):
    id: int

@app.post("/marcas", response_model=MarcaOut)
def crear_marca(marca: Marca):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO marcas (nombre, descripcion) VALUES (?, ?)", (marca.nombre, marca.descripcion))
    conn.commit()
    id = cursor.lastrowid
    conn.close()
    return MarcaOut(id=id, **marca.dict())

@app.get("/marcas", response_model=List[MarcaOut])
def listar_marcas():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute("SELECT id, nombre, descripcion FROM marcas")
    rows = cursor.fetchall()
    conn.close()
    return [MarcaOut(id=row[0], nombre=row[1], descripcion=row[2]) for row in rows]

@app.get("/marcas/{marca_id}", response_model=MarcaOut)
def obtener_marca(marca_id: int):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute("SELECT id, nombre, descripcion FROM marcas WHERE id = ?", (marca_id,))
    row = cursor.fetchone()
    conn.close()
    if row:
        return MarcaOut(id=row[0], nombre=row[1], descripcion=row[2])
    raise HTTPException(status_code=404, detail="Marca no encontrada")

@app.put("/marcas/{marca_id}", response_model=MarcaOut)
def actualizar_marca(marca_id: int, marca: Marca):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute("UPDATE marcas SET nombre = ?, descripcion = ? WHERE id = ?", (marca.nombre, marca.descripcion, marca_id))
    conn.commit()
    cursor.execute("SELECT id, nombre, descripcion FROM marcas WHERE id = ?", (marca_id,))
    row = cursor.fetchone()
    conn.close()
    if row:
        return MarcaOut(id=row[0], nombre=row[1], descripcion=row[2])
    raise HTTPException(status_code=404, detail="Marca no encontrada")

@app.delete("/marcas/{marca_id}")
def eliminar_marca(marca_id: int):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute("DELETE FROM marcas WHERE id = ?", (marca_id,))
    conn.commit()
    conn.close()
    return {"detail": "Marca eliminada"}
