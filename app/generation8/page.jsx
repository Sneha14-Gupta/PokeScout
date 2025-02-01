"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { ArrowUpDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Fuse from "fuse.js";
import InfoPageHeader from "@/components/InfoPageHeader";
import { fetchPokemonByGeneration } from "@/lib/pokemonData"; // Import fetch function

const typeColors = {
  normal: ["#A8A77A", "#C6C6A7"],
  fire: ["#EE8130", "#F5AC78"],
  water: ["#6390F0", "#9DB7F5"],
  electric: ["#F7D02C", "#FAE078"],
  grass: ["#7AC74C", "#A7DB8D"],
  ice: ["#96D9D6", "#BCE6E6"],
  fighting: ["#C22E28", "#D67873"],
  poison: ["#A33EA1", "#C183C1"],
  ground: ["#E2BF65", "#EBD69D"],
  flying: ["#A98FF3", "#C6B7F5"],
  psychic: ["#F95587", "#FA92B2"],
  bug: ["#A6B91A", "#C6D16E"],
  rock: ["#B6A136", "#D1C17D"],
  ghost: ["#735797", "#A292BC"],
  dragon: ["#6F35FC", "#A27DFA"],
  dark: ["#705746", "#A29288"],
  steel: ["#B7B7CE", "#D1D1E0"],
  fairy: ["#D685AD", "#F4BDC9"],
};

const types = {
  all: "All",
  normal: "Normal",
  fire: "Fire",
  water: "Water",
  electric: "Electric",
  grass: "Grass",
  ice: "Ice",
  fighting: "Fighting",
  poison: "Poison",
  ground: "Ground",
  flying: "Flying",
  psychic: "Psychic",
  bug: "Bug",
  rock: "Rock",
  ghost: "Ghost",
  dragon: "Dragon",
  dark: "Dark",
  steel: "Steel",
  fairy: "Fairy",
};

export default function PokemonLayout() {
  const [sortByNumber, setSortByNumber] = useState("desc");
  const [sortByType, setSortByType] = useState("all");
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonImages, setPokemonImages] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPokemon = async (genNumber) => {
      setLoading(true);
      try {
        const { detailedPokemon, images } =
          await fetchPokemonByGeneration(genNumber);
        setPokemonList(detailedPokemon);
        setPokemonImages(images);
      } catch (error) {
        console.error("Error loading Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPokemon(8); // Here you're passing the generation number (1) as an argument.
  }, []);

  const fuse = useMemo(() => {
    return new Fuse(pokemonList, {
      keys: ["name", "id"],
      threshold: 0.2,
    });
  }, [pokemonList]);

  const filteredPokemon = useMemo(() => {
    let result = pokemonList;

    if (searchTerm) {
      result = fuse.search(searchTerm).map(({ item }) => item);
    }

    result = result.filter(
      (pokemon) =>
        sortByType === "all" ||
        pokemon.types.some(
          (type) => type.toLowerCase() === sortByType.toLowerCase(),
        ),
    );

    return result.sort((a, b) => {
      if (sortByNumber === "asc") {
        return a.name.localeCompare(b.name);
      } else if (sortByNumber === "desc") {
        return a.id - b.id;
      }
      return 0;
    });
  }, [pokemonList, searchTerm, sortByType, sortByNumber, fuse]);

  return (
    <div className="container mx-auto min-h-screen w-full space-y-6 overflow-x-hidden bg-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50 p-4 px-4 md:px-10">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <video
            src="./pikachu.webm"
            autoPlay
            loop
            muted
            className="h-40 w-40"
          ></video>
        </div>
      )}
      <InfoPageHeader generation={1} />
      <div className="mb-8 flex flex-col items-center justify-between gap-4 pl-5 md:flex-row md:pl-10">
        <div className="relative mr-12 w-80 md:w-1/2">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search Pokémon by Name or Number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-80 rounded-full border-2 border-yellow-400 py-2 pl-10 pr-4 transition-colors focus:border-yellow-500 focus:outline-none md:w-96"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-yellow-500" />
          </div>
        </div>
        <div className="flex items-center gap-4 pr-6 md:pr-12">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-[120px] border-yellow-500 bg-gradient-to-br from-yellow-400 to-yellow-300 sm:w-[200px]"
              >
                <ArrowUpDown className="mr-2 h-4 w-4" />
                Sort by
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px]">
              <DropdownMenuRadioGroup
                value={sortByNumber}
                onValueChange={setSortByNumber}
              >
                <DropdownMenuRadioItem value="desc">
                  Numerically
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="asc">
                  Alphabetically
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-[120px] border-yellow-500 bg-gradient-to-br from-yellow-400 to-yellow-300 sm:w-[200px]"
              >
                <ArrowUpDown className="mr-2 h-4 w-4" />
                Sort by Type
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-auto min-w-[200px]">
              <DropdownMenuRadioGroup
                value={sortByType}
                onValueChange={setSortByType}
                className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8"
              >
                {Object.keys(types).map((type, index) => (
                  <DropdownMenuRadioItem
                    key={index}
                    value={type}
                    className="flex-1 text-center"
                  >
                    {types[type]}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div
        className="grid grid-cols-1 place-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3"
        onLoadedData={() => setLoading(false)}
      >
        {filteredPokemon.map((pokemon) => (
          <Card
            key={pokemon.id}
            className="relative h-44 w-72 cursor-pointer rounded-3xl shadow-lg transition-all duration-300 hover:shadow-2xl md:h-48 md:w-72 lg:h-44 lg:w-96"
            style={{
              background: `linear-gradient(135deg, ${
                typeColors[pokemon.types[0]][0]
              } 0%, ${typeColors[pokemon.types[0]][1]} 100%)`,
            }}
          >
            {/* Update Link to include the dynamic id */}
            <Link href={`/pokeinfo/${pokemon.id}`}>
              <CardContent className="p-0">
                <div className="flex h-full items-center">
                  <div className="w-2/3 space-y-2 p-4">
                    <h2 className="mb-10 text-lg font-medium capitalize text-white">
                      #{pokemon.id}
                    </h2>
                    <h2 className="text-lg font-medium capitalize text-white">
                      {pokemon.name}
                    </h2>
                    <div className="mt-8 flex flex-wrap gap-2 text-sm">
                      {pokemon.types.map((type, index) => (
                        <p
                          key={index}
                          className="rounded-lg bg-black bg-opacity-20 px-3 py-1.5 font-semibold capitalize text-white"
                        >
                          {type}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="absolute -right-2 -top-1 aspect-square h-40 w-40 animate-bounce">
                    {pokemonImages[pokemon.id] && (
                      <Image
                        src={pokemonImages[pokemon.id] || "/placeholder.svg"}
                        alt={pokemon.name}
                        fill
                        sizes="100vh"
                        className="absolute p-4 drop-shadow-2xl"
                      />
                    )}
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
