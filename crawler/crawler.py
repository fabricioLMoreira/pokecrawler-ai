import requests
import datetime
import psycopg2
import logging
import os

BASE_URL = "https://pokeapi.co/api/v2"

# Set up logging
logging.basicConfig(level=logging.INFO)

def get_pokemon_list():
    """Fetch the first 151 Pokémon from the API."""
    pokemons = []
    next_url = f"{BASE_URL}/pokemon?limit=151"  # Fetch the first 151 Pokémon

    logging.info(f"Starting to fetch Pokémon list...")

    try:
        logging.debug(f"Fetching data from {next_url}")
        response = requests.get(next_url, timeout=10)
        response.raise_for_status()  # Raise exception for non-2xx responses
        data = response.json()

        logging.debug(f"Fetched {len(data['results'])} Pokémon from this batch.")  # Log number of Pokémon fetched
        pokemons.extend(data["results"])  # Add fetched Pokémon to the list
        logging.info(f"Finished fetching Pokémon. Total count: {len(pokemons)}")

    except requests.exceptions.RequestException as e:
        logging.error(f"Error fetching Pokémon list: {e}")

    return pokemons

def get_pokemon_details(name, url):
    """Get details of a Pokémon from its API URL."""
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()

        pokemon = response.json()

        # Extracting data
        types = pokemon["types"]
        type_primary = types[0]["type"]["name"]
        type_secondary = types[1]["type"]["name"] if len(types) > 1 else None
        sprite = (pokemon["sprites"]["other"]["dream_world"]["front_default"]
                  if pokemon["sprites"]["other"]["dream_world"].get("front_default") else
                  pokemon["sprites"].get("front_default") if pokemon["sprites"].get("front_default") else None)

        pokemon_details = {
            "id": pokemon["id"],
            "name": pokemon["name"],
            "url": url,
            "type_primary": type_primary,
            "type_secondary": type_secondary,
            "sprite": sprite
        }
        
        return pokemon_details

    except requests.exceptions.RequestException as e:
        logging.error(f"Error fetching details for {name}: {e}")
        return None
    except Exception as e:
        logging.error(f"Unexpected error while fetching details for {name}: {e}")
        return None


def process_pokemon_data():
    """Fetches Pokémon list and retrieves details."""
    pokemons = get_pokemon_list()
    processed = [get_pokemon_details(pokemon["name"], pokemon["url"]) for pokemon in pokemons]
    return [p for p in processed if p]  # Remove None values if API errors occur


def insert_pokemon_data(pokemons):
    """Insert Pokémon data into PostgreSQL in batch."""
    try:
        # Establish database connection
        conn = psycopg2.connect(
            dbname=os.getenv("POSTGRES_DB"),
            user=os.getenv("POSTGRES_USER"),
            password=os.getenv("POSTGRES_PASSWORD"),
            host=os.getenv("POSTGRES_HOST"),
            port=os.getenv("POSTGRES_PORT")
        )
        cur = conn.cursor()

        # Use a list comprehension to gather all data in one go for batch insert
        values = [(p["id"], p["name"], p["type_primary"], p["type_secondary"], p["url"], p["sprite"]) for p in pokemons]
        
        insert_query = """
            INSERT INTO pokemons (id, name, type_primary, type_secondary, url, sprite)
            VALUES (%s, %s, %s, %s, %s, %s)
            ON CONFLICT (id) DO NOTHING;  -- Avoid duplicate insertions
        """

        # Execute batch insert
        cur.executemany(insert_query, values)
        
        conn.commit()
        cur.close()
        conn.close()
        logging.info(f"Inserted {len(pokemons)} Pokémon into the database successfully.")
    
    except Exception as e:
        logging.error(f"Error inserting data: {e}")


if __name__ == "__main__":
    # Get current timestamp
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    logging.info(f"{timestamp}: Starting Crawler...")

    pokemons = process_pokemon_data()
    insert_pokemon_data(pokemons)

    logging.info(f"{timestamp}: Crawler completed!")

