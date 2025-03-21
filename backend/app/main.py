# Ponto de entrada da aplicação FastAPI.
# Aqui é criado o app, configurado o middleware de CORS e incluídos as routas da aplicação.

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.config import ALLOWED_ORIGINS
from api.routes_pokemon import router as pokemon_router
from db.database import engine, Base

app = FastAPI()

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Regista as rotas
app.include_router(pokemon_router, prefix="/pokemons", tags=["Pokémons"])