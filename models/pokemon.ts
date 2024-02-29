export interface ListProps {
  name: string;
  url: string;
}

export interface PokemonGridProps {
  pokemonList: ListProps[];
  pokemonTypeList: ListProps[];
}
