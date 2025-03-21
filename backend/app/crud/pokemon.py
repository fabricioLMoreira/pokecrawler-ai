# Contém as funções responsáveis por interagir diretamente com a base de dados.
# Segue o padrão CRUD (Create, Read, Update, Delete).
#
# Cada função recebe uma sessão assíncrona do SQLAlchemy e executa queries.
# Esta camada abstrai o acesso ao banco de dados e é usada nos routers.

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.db.models import Pokemon
from app.schemas.pokemon import PokemonCreate, PokemonUpdate

# Busca todos os pokémon na base de dados
async def get_all_pokemons(db: AsyncSession):
    result = await db.execute(select(Pokemon))
    return result.scalars().all()

# Busca um pokémon por ID
async def get_pokemon_by_id(db: AsyncSession, pokemon_id: int):
    result = await db.execute(select(Pokemon).where(Pokemon.id == pokemon_id))
    return result.scalar_one_or_none()

# Cria um novo pokémon na base de dados
async def create_pokemon(db: AsyncSession, pokemon: PokemonCreate):
    db_pokemon = Pokemon(**pokemon.dict())
    db.add(db_pokemon)
    await db.commit()
    await db.refresh(db_pokemon)
    return db_pokemon

# Atualiza um pokémon existente
async def update_pokemon(db: AsyncSession, pokemon_id: int, data: PokemonUpdate):
    db_pokemon = await get_pokemon_by_id(db, pokemon_id)
    if not db_pokemon:
        return None
    for key, value in data.dict().items():
        setattr(db_pokemon, key, value)
    await db.commit()
    await db.refresh(db_pokemon)
    return db_pokemon

# Remove um pokémon pelo ID
async def delete_pokemon(db: AsyncSession, pokemon_id: int):
    db_pokemon = await get_pokemon_by_id(db, pokemon_id)
    if db_pokemon:
        await db.delete(db_pokemon)
        await db.commit()
        return True
    return False

# Retorna uma lista de tipos únicos (primários e secundários)
async def get_unique_types(db: AsyncSession):
    result = await db.execute(select(Pokemon.type_primary, Pokemon.type_secondary))
    rows = result.all()
    unique = set()
    for p, s in rows:
        unique.add(p)
        if s:
            unique.add(s)
    return sorted(unique)
