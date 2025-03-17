import requests
import datetime

def fetch_pokemon_data():
    response = requests.get("https://pokeapi.co/api/v2/pokemon?limit=10")
    return response.json()["results"]

def process_pokemon_data():
    pokemons = fetch_pokemon_data()
    processed = [{"name": p["name"]} for p in pokemons]
    return processed

if __name__ == "__main__":
    # Get current timestamp
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    print(f"{timestamp}: starting Crawler...")
    print(process_pokemon_data())
