"use client";

import { ListProps } from "@/models/pokemon";
import Image from "next/image";

const PokemonImage: React.FC<ListProps> = ({ name, url }) => {
  return (
    <Image
      src={url}
      alt={"Picture of " + name}
      priority
      fill
      style={{ objectFit: "contain" }}
      className="transition-opacity opacity-0 duration-[2s]"
      onLoadingComplete={(url) => url.classList.remove("opacity-0")}
    />
  );
};

export default PokemonImage;
