import PokemonGrid from "@/components/PokemonGrid";
import { getPokemonList, getPokemonTypeList } from "@/lib/pokemonAPI";

export default async function Home() {
  const pokemonList = await getPokemonList();
  const pokemonTypeList = await getPokemonTypeList();

  return (
    <PokemonGrid pokemonList={pokemonList} pokemonTypeList={pokemonTypeList} />
  );
}
