import PokemonImage from "@/components/PokemonImage";
import { getPokemonDetails } from "@/lib/pokemonAPI";

export default async function PokemonPage({
  params,
}: {
  params: { pokemonName: string };
}) {
  const { pokemonName } = params;
  const pokemonObject = await getPokemonDetails(pokemonName);

  let total = 0;

  return (
    <div className="border bg-white border-gray-200 border-3 border-spacing-3 p-5 rounded-lg m-auto mt-0 pt-0 flex items-center flex-col">
      <div
        className="m-4 pt-4"
        style={{ position: "relative", width: "200px", height: "200px" }}
      >
        <PokemonImage
          url={pokemonObject.sprites.other["official-artwork"].front_default}
          name={pokemonName}
        />
      </div>
      <h1 className="text-3xl text-bold mb-3">
        {pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}
      </h1>

      <h3 className="flex flex-row self-start">
        <strong className="mr-2">Weight: </strong>{pokemonObject.weight}
      </h3>
      <div className="flex flex-row self-start mt-4">
        <h3>
          <strong>Types:</strong>
        </h3>
        {pokemonObject.types.map((type: any, index: number) => {
          return (
            <h1 className="ml-2">
              {type.type.name}
              {index === pokemonObject.types.length - 1 ? "" : ","}
            </h1>
          );
        })}
      </div>
      <div className="flex flex-row self-start mt-4">
        <h3>
          <strong>Abilities:</strong>
        </h3>
        {pokemonObject.abilities.map((ability: any, index: number) => {
          return (
            <h1 className="ml-2">
              {ability.ability.name}
              {index === pokemonObject.abilities.length - 1 ? "" : ","}
            </h1>
          );
        })}
      </div>
      <div className="flex-col mt-4 w-96">
        {pokemonObject.stats.map((statObject: any) => {
          const statName = statObject.stat.name;
          const statValue = statObject.base_stat;
          total += statValue;

          return (
            <div
              className="flex items-stretch"
              key={statName}
            >
              <h4 className="p-1 w-2/4 flex justify-between mr-4">
                <strong>
                  <small>
                    {statName.charAt(0).toUpperCase() + statName.slice(1)}
                  </small>
                </strong>
                <small>{statValue}</small>
              </h4>
              {statValue < 50 ? (
                <progress
                  className="w-2/4 m-auto progress-error progress"
                  value={statValue}
                  max="100"
                />
              ) : (
                <progress
                  className="w-2/4 m-auto progress-success progress"
                  value={statValue}
                  max="100"
                />
              )}
            </div>
          );
        })}

        <h4 className="p-1 w-2/4 flex justify-between">
          <strong>
            <small>Total</small>
          </strong>
          <strong>
            <small>{total}</small>
          </strong>
        </h4>
      </div>
    </div>
  );
}
