"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Header from "@/components/Header";

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

  useEffect(() => {
    async function fetchPokemonData() {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?offset=649&limit=72"
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
          const paddedName = pokemon.name.toLowerCase(); // Ensure lowercase name
          images[pokemon.id] = `${baseUrl}${paddedName}.png`;
        });

        setPokemonImages(images);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    }

    fetchPokemonData();
  }, []);

  const filteredPokemon = pokemonList
    .filter(
      (pokemon) =>
        sortByType === "all" ||
        pokemon.types.some(
          (type) => type.toLowerCase() === sortByType.toLowerCase()
        )
    )
    .sort((a, b) => {
      if (sortByNumber === "asc") {
        return a.name.localeCompare(b.name);
      } else if (sortByNumber === "desc") {
        return a.id - b.id;
      }
      return 0;
    });

  return (
    <div className="container mx-auto px-10 space-y-6 bg-yellow-300 p-4 min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      <Header />
      <div className="flex flex-wrap justify-center gap-4 ">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-[150px] sm:w-[200px] bg-gradient-to-br from-yellow-400 to-yellow-300 border-yellow-500"
            >
              <ArrowUpDown className="mr-2 h-4 w-4" />
              Sort by
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px] ">
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
              className="w-[150px] sm:w-[200px] bg-gradient-to-br from-yellow-400 to-yellow-300 border-yellow-500"
            >
              <ArrowUpDown className="mr-2 h-4 w-4" />
              Sort by Type
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-auto min-w-[200px]">
            <DropdownMenuRadioGroup
              value={sortByType}
              onValueChange={setSortByType}
              className="grid grid-cols-8"
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 -z-50 place-items-center">
        {filteredPokemon.map((pokemon) => (
          <Card
            key={pokemon.id}
            className="rounded-3xl relative h-44 w-96 m-4 md:w-72 md:h-48 lg:h-44 lg:w-96 cursor-pointer bg-gradient-to-br from-yellow-400 to-yellow-300 border-yellow-500 shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <CardContent className="p-0">
              <div className="flex items-center">
                <div className="w-2/3 p-4 space-y-2">
                  <h2 className="text-lg font-medium capitalize text-yellow-800">
                    #{pokemon.id}
                  </h2>
                  <h2 className="text-lg font-medium capitalize text-yellow-800">
                    {pokemon.name}
                  </h2>
                  <div className="text-sm flex flex-wrap gap-2">
                    {pokemon.types.map((type, index) => {
                      console.log("Type:", type); // Check the type value
                      return (
                        <p
                          key={index}
                          className="py-1.5 px-3 rounded-lg font-semibold capitalize text-white"
                          style={{
                            backgroundColor: typeColors[type] || "#D3D3D3",
                          }}
                        >
                          {type}
                        </p>
                      );
                    })}
                  </div>
                </div>
                <div className="aspect-square relative -right-4 -top-[3rem] md:right-7 md:-top-[3rem] lg:-top-[3rem] lg:-right-4 h-52 w-52 animate-bounce">
                  {pokemonImages[pokemon.id] && (
                    <Image
                      src={pokemonImages[pokemon.id]}
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
