from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Welcome to Pokecrawler AI"}

@app.get("/pokemons")
def get_pokemons():
    return {"message": "List of Pokemons will be here"}