
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models.db import Base, engine
from routes.marca import router as marca_router

app = FastAPI()

# Inicializar la base de datos con SQLAlchemy ORM
Base.metadata.create_all(bind=engine)

# CORS config (permitir acceso desde frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir rutas de marcas
app.include_router(marca_router)
