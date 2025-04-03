import axios from "axios";

const BASE_URL = "http://localhost:8000/v1/pokemons";

export const getAllPokemons = () => axios.get(BASE_URL);
export const getPokemonTypes = () => axios.get(`${BASE_URL}/pokemon-types`);
