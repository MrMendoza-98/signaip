import sqlite3
from typing import List, Optional
from ..schemas.marca import MarcaCreate, MarcaUpdate, MarcaOut

DB_NAME = "marcas.db"

class MarcaService:
    @staticmethod
    def create_marca(marca: MarcaCreate) -> MarcaOut:
        conn = sqlite3.connect(DB_NAME)
        cursor = conn.cursor()
        cursor.execute("INSERT INTO marcas (nombre, descripcion) VALUES (?, ?)", (marca.nombre, marca.descripcion))
        conn.commit()
        id = cursor.lastrowid
        conn.close()
        return MarcaOut(id=id, **marca.dict())

    @staticmethod
    def get_marcas() -> List[MarcaOut]:
        conn = sqlite3.connect(DB_NAME)
        cursor = conn.cursor()
        cursor.execute("SELECT id, nombre, descripcion FROM marcas")
        rows = cursor.fetchall()
        conn.close()
        return [MarcaOut(id=row[0], nombre=row[1], descripcion=row[2]) for row in rows]

    @staticmethod
    def get_marca(marca_id: int) -> Optional[MarcaOut]:
        conn = sqlite3.connect(DB_NAME)
        cursor = conn.cursor()
        cursor.execute("SELECT id, nombre, descripcion FROM marcas WHERE id = ?", (marca_id,))
        row = cursor.fetchone()
        conn.close()
        if row:
            return MarcaOut(id=row[0], nombre=row[1], descripcion=row[2])
        return None

    @staticmethod
    def update_marca(marca_id: int, marca: MarcaUpdate) -> Optional[MarcaOut]:
        conn = sqlite3.connect(DB_NAME)
        cursor = conn.cursor()
        cursor.execute("UPDATE marcas SET nombre = ?, descripcion = ? WHERE id = ?", (marca.nombre, marca.descripcion, marca_id))
        conn.commit()
        cursor.execute("SELECT id, nombre, descripcion FROM marcas WHERE id = ?", (marca_id,))
        row = cursor.fetchone()
        conn.close()
        if row:
            return MarcaOut(id=row[0], nombre=row[1], descripcion=row[2])
        return None

    @staticmethod
    def delete_marca(marca_id: int) -> bool:
        conn = sqlite3.connect(DB_NAME)
        cursor = conn.cursor()
        cursor.execute("DELETE FROM marcas WHERE id = ?", (marca_id,))
        conn.commit()
        conn.close()
        return True
