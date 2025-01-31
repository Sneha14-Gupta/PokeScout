"use client";
import Image from "next/image";
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

const typeColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
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
    async function fetchPokemonData() {
      setLoading(true);

      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?offset=151&limit=100"
        );
        const data = await response.json();

        const detailedPokemon = await Promise.all(
          data.results.map(async (pokemon) => {
            const detailsResponse = await fetch(pokemon.url);
            const details = await detailsResponse.json();
            return {
              id: details.id,
              name: details.name,
              types: details.types.map((t) => t.type.name) || [],
            };
          })
        );
        setPokemonList(detailedPokemon);

        const baseUrl = "https://img.pokemondb.net/sprites/home/normal/";
        const images = {};
        detailedPokemon.forEach((pokemon) => {
          const paddedName = pokemon.name.toLowerCase();
          images[pokemon.id] = `${baseUrl}${paddedName}.png`;
        });

        setPokemonImages(images);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemonData();
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
          (type) => type.toLowerCase() === sortByType.toLowerCase()
        )
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
    <div className="w-full overflow-x-hidden container mx-auto px-4 md:px-10 space-y-6 bg-yellow-300 p-4 min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <video
            src="./pikachu.webm"
            autoPlay
            loop
            muted
            className="w-40 h-40"
          ></video>
        </div>
      )}
      <InfoPageHeader generation = {2}/>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 pl-5 md:pl-10">
        <div className="w-80 md:w-1/2 relative mr-12">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search Pokémon by Name or Number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-80 md:w-96 border-2 border-yellow-400 rounded-full focus:outline-none focus:border-yellow-500 transition-colors"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500" />
          </div>
        </div>
        <div className="flex items-center gap-4 pr-6 md:pr-12">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-[120px] sm:w-[200px] bg-gradient-to-br from-yellow-400 to-yellow-300 border-yellow-500"
              >
                <ArrowUpDown className="mr-2 h-4 w-4 " />
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
                className="w-[120px] sm:w-[200px] bg-gradient-to-br from-yellow-400 to-yellow-300 border-yellow-500"
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
        className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  place-items-center "
        onLoadedData={() => setLoading(false)}
      >
        {filteredPokemon.map((pokemon) => (
          <Card
            key={pokemon.id}
            className="rounded-3xl relative h-44 w-72 md:w-72 md:h-48 lg:h-44 lg:w-96 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
            style={{
              backgroundColor: typeColors[pokemon.types[0]] || "#A8A77A",
            }}
          >
            <CardContent className="p-0">
              <div className="flex items-center h-full">
                <div className="w-2/3 p-4 space-y-2">
                  <h2 className="text-lg font-medium capitalize text-white mb-10">
                    #{pokemon.id}
                  </h2>
                  <h2 className="text-lg font-medium capitalize text-white ">
                    {pokemon.name}
                  </h2>
                  <div className="text-sm flex flex-wrap gap-2 mt-8">
                    {pokemon.types.map((type, index) => (
                      <p
                        key={index}
                        className="py-1.5 px-3 rounded-lg font-semibold capitalize text-white bg-black bg-opacity-20"
                      >
                        {type}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="aspect-square absolute -right-2 -top-1 h-40 w-40 animate-bounce">
                  {pokemonImages[pokemon.id] && (
                    <Image
                      src={pokemonImages[pokemon.id] || "/placeholder.svg"}
                      alt={pokemon.name}
                      fill
                      sizes="100vh"
                      className="p-4 absolute drop-shadow-2xl"
                    />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
