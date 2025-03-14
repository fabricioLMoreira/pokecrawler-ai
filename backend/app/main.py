from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configuração do CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Permitir o frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dados Fake - Lista de Pokémon
fake_pokemons = [
    {"id": 1, "name": "Bulbasaur", "type": "Grass/Poison", "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"},
    {"id": 4, "name": "Charmander", "type": "Fire", "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png"},
    {"id": 7, "name": "Squirtle", "type": "Water", "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png"},
    {"id": 25, "name": "Pikachu", "type": "Electric", "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"},
    {"id": 39, "name": "Jigglypuff", "type": "Normal/Fairy", "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/39.png"},
    {"id": 52, "name": "Meowth", "type": "Normal", "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/52.png"},
    {"id": 63, "name": "Abra", "type": "Psychic", "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/63.png"},
    {"id": 74, "name": "Geodude", "type": "Rock/Ground", "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/74.png"},
    {"id": 92, "name": "Gastly", "type": "Ghost/Poison", "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/92.png"},
    {"id": 133, "name": "Eevee", "type": "Normal", "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png"},
    {"id": 147, "name": "Dratini", "type": "Dragon", "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/147.png"},
    {"id": 212, "name": "Scizor", "type": "Bug/Steel", "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/212.png"},
    {"id": 248, "name": "Tyranitar", "type": "Rock/Dark", "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/248.png"},
    {"id": 282, "name": "Gardevoir", "type": "Psychic/Fairy", "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/282.png"},
    {"id": 448, "name": "Lucario", "type": "Fighting/Steel", "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png"},
    {"id": 6, "name": "Charizard", "type": "Fire/Flying", "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png"},
    {"id": 9, "name": "Blastoise", "type": "Water", "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png"},
    {"id": 26, "name": "Raichu", "type": "Electric", "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/26.png"},
    {"id": 94, "name": "Gengar", "type": "Ghost/Poison", "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png"},
    {"id": 149, "name": "Dragonite", "type": "Dragon/Flying", "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png"},
    {"id": 257, "name": "Blaziken", "type": "Fire/Fighting", "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/257.png"},
    {"id": 330, "name": "Flygon", "type": "Ground/Dragon", "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/330.png"},
    {"id": 350, "name": "Milotic", "type": "Water", "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/350.png"},
    {"id": 448, "name": "Lucario", "type": "Fighting/Steel", "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png"},
    {"id": 460, "name": "Abomasnow", "type": "Grass/Ice", "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/460.png"},
    {"id": 472, "name": "Gliscor", "type": "Ground/Flying", "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/472.png"},
    {"id": 635, "name": "Hydreigon", "type": "Dark/Dragon", "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/635.png"},
    {"id": 700, "name": "Sylveon", "type": "Fairy", "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/700.png"},
    {"id": 719, "name": "Diancie", "type": "Rock/Fairy", "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/719.png"},
    {"id": 809, "name": "Melmetal", "type": "Steel", "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/809.png"},
    {"id": 873, "name": "Frosmoth", "type": "Ice/Bug", "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/873.png"},
    {"id": 892, "name": "Urshifu", "type": "Fighting/Dark", "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/892.png"},
    {"id": 905, "name": "Enamorus", "type": "Fairy/Flying", "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/905.png"},
]

# Retorna a lista de Pokémon
@app.get("/pokemons")
def get_pokemons():
    return fake_pokemons

# Retorna os tipos únicos extraídos da lista de Pokémon
@app.get("/types")
def get_types():
    unique_types = set()
    for pokemon in fake_pokemons:
        types = pokemon["type"].split("/")
        unique_types.update(types)
    return sorted(unique_types)
