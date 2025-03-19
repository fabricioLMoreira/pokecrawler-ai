from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from database import get_db
from models import Pokemon

app = FastAPI()

# Configuração do CORS para permitir requisições do frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Permitir acesso do frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Endpoint para obter todos os Pokémon
@app.get("/pokemons")
async def get_pokemons(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Pokemon))
    pokemons = result.scalars().all()
    return pokemons

# Endpoint para obter todos os tipos únicos de Pokémon
@app.get("/types")
async def get_types(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Pokemon.type_primary, Pokemon.type_secondary))
    rows = result.all()
    
    unique_types = set()
    for primary, secondary in rows:
        unique_types.add(primary)
        if secondary:
            unique_types.add(secondary)
    
    return sorted(unique_types)
