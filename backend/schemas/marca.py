from pydantic import BaseModel

class MarcaBase(BaseModel):
    nombre: str
    descripcion: str = ""

class MarcaCreate(MarcaBase):
    pass

class MarcaUpdate(MarcaBase):
    pass

class MarcaOut(MarcaBase):
    id: int
