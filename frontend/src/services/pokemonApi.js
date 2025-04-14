import axios from "axios";

const BASE_API_URL = "http://localhost:8000";
const POKEMON_URL = `${BASE_API_URL}/v1/pokemons`;

// Login e guarda do token
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_API_URL}/login`, {
      username,
      password,
    });

    const token = response.data.access_token;

    // Guarda no localStorage para manter login
    localStorage.setItem("access_token", token);

    return response.data;
  } catch (error) {
    throw new Error("Login falhou");
  }
};

// Headers com token atual do localStorage
const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
});

// Exige autenticação
export const getAllPokemons = () =>
  axios.get(POKEMON_URL, authHeaders());

export const getPokemonTypes = () =>
  axios.get(`${POKEMON_URL}/pokemon-types`, authHeaders());

// Apaga um pokémon (com token)
export const deletePokemon = async (id) => {
  return axios.delete(`${POKEMON_URL}/${id}`, authHeaders());
};

// Atualiza um pokémon (com token)
export const updatePokemon = async (id, data) => {
  return axios.put(`${POKEMON_URL}/${id}`, data, authHeaders());
};

