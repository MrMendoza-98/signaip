from fastapi import APIRouter, HTTPException
from typing import List
from schemas.marca import MarcaCreate, MarcaUpdate, MarcaOut
from services.marca_service import MarcaService

router = APIRouter()

@router.post("/marcas", response_model=MarcaOut)
def crear_marca(marca: MarcaCreate):
    return MarcaService.create_marca(marca)

@router.get("/marcas", response_model=List[MarcaOut])
def listar_marcas():
    return MarcaService.get_marcas()

@router.get("/marcas/{marca_id}", response_model=MarcaOut)
def obtener_marca(marca_id: int):
    marca = MarcaService.get_marca(marca_id)
    if marca:
        return marca
    raise HTTPException(status_code=404, detail="Marca no encontrada")

@router.put("/marcas/{marca_id}", response_model=MarcaOut)
def actualizar_marca(marca_id: int, marca: MarcaUpdate):
    updated = MarcaService.update_marca(marca_id, marca)
    if updated:
        return updated
    raise HTTPException(status_code=404, detail="Marca no encontrada")

@router.delete("/marcas/{marca_id}")
def eliminar_marca(marca_id: int):
    MarcaService.delete_marca(marca_id)
    return {"detail": "Marca eliminada"}
