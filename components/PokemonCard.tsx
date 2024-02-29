import Link from "next/link";
import { ListProps } from "@/models/pokemon";
import PokemonImage from "./PokemonImage";

const PokemonCard: React.FC<ListProps> = ({ name, url }) => {
  const pokemonId = url.split("/")[6];

  return (
    <Link
      href={name}
      className="group rounded-3xl  bg-white shadow shadow-gray-500 m-3 px-5 py-4 transition-colors hover:border-spacing-4 hover:shadow-2xl hover:shadow-emerald-500 hover:bg-gray-100 hover:text-emerald-500"
      key={name + "Card"}
    >
      <div
        className="m-4"
        style={{ position: "relative", width: "150px", height: "150px" }}
      >
        <PokemonImage
          name={name}
          url={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
        />
      </div>
      <h2 className={`text-3xl font-semibold text-center`}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </h2>
    </Link>
  );
};

export default PokemonCard;
