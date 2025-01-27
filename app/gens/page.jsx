"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { motion } from "framer-motion";

export default function PokemonGenerations() {
  const generations = [
    {
      number: 1,
      pokemon: "Articuno",
      image: "https://img.pokemondb.net/sprites/home/normal/articuno.png",
    },
    {
      number: 2,
      pokemon: "Suicune",
      image: "https://img.pokemondb.net/sprites/home/normal/suicune.png",
    },
    {
      number: 3,
      pokemon: "Groudon",
      image: "https://img.pokemondb.net/sprites/home/normal/groudon.png",
    },
    {
      number: 4,
      pokemon: "Palkia",
      image: "https://img.pokemondb.net/sprites/home/normal/palkia.png",
    },
    {
      number: 5,
      pokemon: "Thundurus",
      image: "https://img.pokemondb.net/sprites/home/normal/thundurus.png",
    },
    {
      number: 6,
      pokemon: "Xerneas",
      image: "https://img.pokemondb.net/sprites/home/normal/xerneas.png",
    },
    {
      number: 7,
      pokemon: "Lunala",
      image: "https://img.pokemondb.net/sprites/home/normal/lunala.png",
    },
    {
      number: 8,
      pokemon: "Enamorus",
      image: "https://img.pokemondb.net/sprites/home/normal/enamorus.png",
    },
    {
      number: 9,
      pokemon: "Miraidon",
      image:
        "https://img.pokemondb.net/sprites/home/normal/miraidon.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-12 text-5xl font-bold text-center text-yellow-800 drop-shadow-lg">
          Pokémon Generations
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {generations.map(({ number, pokemon, image }, index) => (
            <motion.div
              key={number}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="relative overflow-visible group cursor-pointer bg-gradient-to-br from-yellow-400 to-yellow-300 border-yellow-500 shadow-lg hover:shadow-2xl transition-all duration-300 p-6">
                <div className="absolute -top-8 -right-4 w-32 h-32 transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2">
                  <div className="relative w-full h-full animate-float">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Generation ${number} - ${pokemon}`}
                      fill
                      className="object-contain drop-shadow-2xl"
                    />
                  </div>
                </div>

                <div className="relative z-10">
                  <div className="bg-yellow-200/50 rounded-lg p-2 backdrop-blur-sm w-fit mb-2">
                    <span className="text-sm font-semibold text-yellow-900">
                      Generation
                    </span>
                  </div>
                  <h2 className="text-4xl font-bold text-yellow-900 mb-1">
                    {number}
                  </h2>
                  <p className="text-lg font-medium text-yellow-800">
                    {pokemon}
                  </p>

                  <div className="absolute bottom-2 left-2 w-12 h-12 bg-yellow-200 rounded-full opacity-20" />
                  <div className="absolute top-2 right-2 w-8 h-8 bg-yellow-500 rounded-full opacity-20" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
