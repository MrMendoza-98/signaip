import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models.db import Base, engine
from routes.marca import router as marca_router
from dotenv import load_dotenv

load_dotenv()
API_HOST = os.getenv("API_HOST", "127.0.0.1")
API_PORT = int(os.getenv("API_PORT", "8000"))
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./marcas.db")
CORS_ORIGINS = [os.getenv("CORS_ORIGINS", "http://localhost:3000")]


app = FastAPI()

# Inicializar la base de datos con SQLAlchemy ORM
Base.metadata.create_all(bind=engine)

# CORS config (permitir acceso desde frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host=API_HOST, port=API_PORT, reload=True)

# Incluir rutas de marcas
app.include_router(marca_router)
