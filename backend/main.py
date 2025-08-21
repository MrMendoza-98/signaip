
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
from routes.marca import router as marca_router

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
