import requests

def fetch_pokemon_data():
    response = requests.get("https://pokeapi.co/api/v2/pokemon?limit=10")
    return response.json()["results"]

def process_pokemon_data():
    pokemons = fetch_pokemon_data()
    processed = [{"name": p["name"]} for p in pokemons]
    return processed

if __name__ == "__main__":
    print("Starting Crawler...")
    print(process_pokemon_data())