# Este ficheiro define os endpoints da API REST relacionados aos Pokémon.
#
# Cada rota segue o padrão RESTful, utilizando os métodos HTTP adequados:
# - GET: para listar e obter Pokémon
# - POST: para criar novos Pokémon
# - PUT: para atualizar Pokémon existentes
# - DELETE: para remover Pokémon
#
# Os dados são validados com Pydantic (schemas) e as operações são executadas através das funções de CRUD.
# O uso de response_model garante que a resposta da API seja clara, consistente e bem documentada no Swagger.
#
# Todas as rotas dependem da sessão de base de dados assíncrona via SQLAlchemy (AsyncSession).


from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from db.database import get_db
from schemas.pokemon import PokemonCreate, PokemonOut, PokemonUpdate
from crud.pokemon import (
    get_all_pokemons, get_pokemon_by_id, create_pokemon,
    update_pokemon, delete_pokemon, get_unique_types
)

router = APIRouter(prefix="/v1/pokemons", tags=["Pokémons"])

# GET /pokemons/pokemon-types - Lista todos os tipos únicos de pokémon
@router.get("/pokemon-types", response_model=List[str])
async def list_types(db: AsyncSession = Depends(get_db)):
    tipos = await get_unique_types(db)
    if not tipos:
        raise HTTPException(status_code=204, detail="Nenhum tipo encontrado")
    return tipos

# GET /pokemons - Lista todos os pokémon
@router.get("", response_model=List[PokemonOut])
async def list_pokemons(db: AsyncSession = Depends(get_db)):
    result = await get_all_pokemons(db)
    if not result:
        raise HTTPException(status_code=204, detail="Nenhum Pokémon encontrado")
    return result

# GET /pokemons/{id} - Obtém um pokémon específico por ID
@router.get("/{pokemon_id}", response_model=PokemonOut)
async def get_pokemon(pokemon_id: int, db: AsyncSession = Depends(get_db)):
    pokemon = await get_pokemon_by_id(db, pokemon_id)
    if not pokemon:
        raise HTTPException(status_code=404, detail="Pokémon não encontrado")
    return pokemon

# POST /pokemons - Cria um novo pokémon
@router.post("", response_model=PokemonOut, status_code=201)
async def create(pokemon: PokemonCreate, db: AsyncSession = Depends(get_db)):
    return await create_pokemon(db, pokemon)

# PUT /pokemons/{id} - Atualiza um pokémon existente
@router.put("/{pokemon_id}", response_model=PokemonOut)
async def update(pokemon_id: int, pokemon: PokemonUpdate, db: AsyncSession = Depends(get_db)):
    updated = await update_pokemon(db, pokemon_id, pokemon)
    if not updated:
        raise HTTPException(status_code=404, detail="Pokémon não encontrado")
    return updated

# DELETE /pokemons/{id} - Remove um pokémon pelo ID
@router.delete("/{pokemon_id}", status_code=204)
async def delete(pokemon_id: int, db: AsyncSession = Depends(get_db)):
    deleted = await delete_pokemon(db, pokemon_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Pokémon não encontrado")
