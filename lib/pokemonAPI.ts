const POKEMON_API = "https://pokeapi.co/api/v2/";

export async function getPokemonList() {
  const response = await fetch(POKEMON_API + "pokemon?limit=220&offset=0");
  const data = await response.json();
  return data.results;
}

export async function getPokemonDetails(name: string) {
  const response = await fetch(POKEMON_API + "pokemon/" + name);
  const data = await response.json();
  return data;
}

export async function getPokemonTypeList() {
  const response = await fetch(POKEMON_API + "type");
  const data = await response.json();
  return data.results;
}

export async function getPokemonListByType(type: string) {
  const response = await fetch(POKEMON_API + "type/" + type);
  const data = await response.json();
  return data.pokemon;
}
