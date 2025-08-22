from typing import List, Optional
from sqlalchemy.orm import Session
from models.marca import Marca
from models.db import SessionLocal
from schemas.marca import MarcaCreate, MarcaUpdate, MarcaOut

class MarcaService:
    @staticmethod
    def get_db():
        db = SessionLocal()
        try:
            yield db
        finally:
            db.close()

    @staticmethod
    def create_marca(marca: MarcaCreate) -> MarcaOut:
        db = SessionLocal()
        db_marca = Marca(nombre=marca.nombre, descripcion=marca.descripcion)
        db.add(db_marca)
        db.commit()
        db.refresh(db_marca)
        db.close()
        return MarcaOut(id=db_marca.id, nombre=db_marca.nombre, descripcion=db_marca.descripcion)

    @staticmethod
    def get_marcas() -> List[MarcaOut]:
        db = SessionLocal()
        marcas = db.query(Marca).all()
        result = [MarcaOut(id=m.id, nombre=m.nombre, descripcion=m.descripcion) for m in marcas]
        db.close()
        return result

    @staticmethod
    def get_marca(marca_id: int) -> Optional[MarcaOut]:
        db = SessionLocal()
        marca = db.query(Marca).filter(Marca.id == marca_id).first()
        db.close()
        if marca:
            return MarcaOut(id=marca.id, nombre=marca.nombre, descripcion=marca.descripcion)
        return None

    @staticmethod
    def update_marca(marca_id: int, marca: MarcaUpdate) -> Optional[MarcaOut]:
        db = SessionLocal()
        db_marca = db.query(Marca).filter(Marca.id == marca_id).first()
        if db_marca:
            db_marca.nombre = marca.nombre
            db_marca.descripcion = marca.descripcion
            db.commit()
            db.refresh(db_marca)
            result = MarcaOut(id=db_marca.id, nombre=db_marca.nombre, descripcion=db_marca.descripcion)
            db.close()
            return result
        db.close()
        return None

    @staticmethod
    def delete_marca(marca_id: int) -> bool:
        db = SessionLocal()
        db_marca = db.query(Marca).filter(Marca.id == marca_id).first()
        if db_marca:
            db.delete(db_marca)
            db.commit()
            db.close()
            return True
        db.close()
        return False
