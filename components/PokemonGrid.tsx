"use client";

import { SetStateAction, useMemo, useState } from "react";
import { PokemonGridProps, ListProps } from "@/models/pokemon";
import PokemonCard from "./PokemonCard";
import Dropdown from "./Dropdown";
import Pagination from "./pagination/Pagination";
import { getPokemonListByType } from "@/lib/pokemonAPI";

let PageSize = 8;

const PokemonGrid: React.FC<PokemonGridProps> = ({
  pokemonList,
  pokemonTypeList,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [pokemons, setPokemons] = useState(pokemonList);
  const [currentPage, setCurrentPage] = useState(1);

  // type filter functionality
  async function typeFilter(typeName: string) {
    if (typeName === "All") setPokemons(pokemonList);
    else {
      const result = await getPokemonListByType(typeName);
      const typeFilterdPokemon: ListProps[] = [];
      result.forEach((item: any) => {
        typeFilterdPokemon.push(item.pokemon);
      });
      setPokemons(typeFilterdPokemon);
    }
  }

  //Search functionality
  const searchFilter = (pokemons: any) => {
    return pokemons.filter((pokemon: any) =>
      pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  const filteredPokemonList = searchFilter(pokemons);

  // Pagination functionality
  const currentPokemons = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return filteredPokemonList.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, searchValue]);

  return (
    <>
      <div>
        <div className="grid sm:grid-cols-8 sm:grid-flow-col w-full items-center justify-center gap-1.5 mb-10">
          <div className="md:col-span-6 sm:col-span-8 col-span-8">
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                placeholder="Search"
                value={searchValue}
                autoComplete="off"
                id="pokemonName"
                onChange={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setSearchValue(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>

          <Dropdown
            text="Type"
            items={pokemonTypeList}
            onChooseType={typeFilter}
          />
        </div>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 lg:text-left">
        {!currentPokemons && <div>Loading...</div>}
        {currentPokemons.map((pokemon: ListProps) => {
          return (
            <PokemonCard
              key={pokemon.name + "Card"}
              name={pokemon.name}
              url={pokemon.url}
            />
          );
        })}
      </div>
      <div>
        <div className="grid items-center mt-4 mb-6 w-full">
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={filteredPokemonList.length}
            pageSize={PageSize}
            onPageChange={(page: SetStateAction<number>) =>
              setCurrentPage(page)
            }
          />
        </div>
      </div>
    </>
  );
};

export default PokemonGrid;
