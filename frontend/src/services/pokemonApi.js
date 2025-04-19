import axios from "axios";

const BASE_API_URL = "http://backend:8000";

const POKEMON_URL = `${BASE_API_URL}/v1/pokemons`;

// Cabeçalhos com token (quando necessário)
const authHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Lista todos os Pokémons (público)
export const getAllPokemons = () => axios.get(POKEMON_URL);

// Lista tipos (público)
export const getPokemonTypes = () =>
  axios.get(`${POKEMON_URL}/pokemon-types`);

// Cria um pokémon (autenticado)
export const createPokemon = async (data, token) => {
  return axios
    .post(`${POKEMON_URL}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

// Atualiza um pokémon (autenticado)
export const updatePokemon = (id, data, token) =>
  axios.put(`${POKEMON_URL}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(res => res.data);

// Apaga um pokémon (autenticado)
export const deletePokemon = (id, token) =>
  axios.delete(`${POKEMON_URL}/${id}`, authHeaders(token));
