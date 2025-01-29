import capitalize from "capitalize";
import Header from "@/components/Header";
import Image from "next/image";
import { toMeter, toKilo } from "@/lib/converter";

const icons = {
  normal: "/images/icons/Normal.png",
  fire: "/images/icons/Fire.png",
  water: "/images/icons/Water.png",
  electric: "/images/icons/Electric.png",
  grass: "/images/icons/Grass.png",
  ice: "/images/icons/Ice.png",
  fighting: "/images/icons/Fighting.png",
  poison: "/images/icons/Poison.png",
  ground: "/images/icons/Ground.png",
  flying: "/images/icons/Flying.png",
  psychic: "/images/icons/Psychic.png",
  bug: "/images/icons/Bug.png",
  rock: "/images/icons/Rock.png",
  ghost: "/images/icons/Ghost.png",
  dragon: "/images/icons/Dragon.png",
  dark: "/images/icons/Dark.png",
  steel: "/images/icons/Steel.png",
  fairy: "/images/icons/Fairy.png",
};

export default async function PokemonInfo() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon/197/");
  const data = await res.json();
  const id = data.id;
  const name = capitalize(data.name);

  const type1 = data.types?.[0]?.type.name;
  const type2 = data.types?.[1]?.type.name;
  const types = type2 ? [type1, type2] : [type1];

  const height = toMeter(data.height);
  const weight = toKilo(data.weight);

  let base_stat = {
    hp: data.stats[0].base_stat,
    attack: data.stats[1].base_stat,
    defense: data.stats[2].base_stat,
    specialAttack: data.stats[3].base_stat,
    specialDefense: data.stats[4].base_stat,
    speed: data.stats[5].base_stat,
  };

  return (
    <div className="h-screen bg-zinc-600 px-5 space-y-6 mx-auto max-w-6xl overflow-y-hidden">
      <Header />
      <section className="flex flex-col justify-start">
        <div className="md:w-1/4 mb-8">
          <p className="text-xs">#{id}</p>
          <h1 className="font-extrabold text-xl">{name}</h1>
        </div>

        <div className="md:w-2/4 flex flex-col justify-center">
          <div className="flex gap-4">
            <p className="text-xs font-bold shadow-inner p-1.5 rounded-md bg-white">
              Height: {height}m
            </p>
            <p className="text-xs font-bold shadow-inner p-1.5 rounded-md bg-white">
              Weight: {weight}kg
            </p>
          </div>
          <Image
            sizes="100vh"
            width={500}
            height={500}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
            alt={name}
            className="mt-5 mb-4"
          />
        </div>
        <div className="md:w-1/4 flex flex-col justify-center items-center gap-2">
          {types.length > 0 && (
            <>
              {types.map((type, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center gap-1 bg-white text-sm font-bold w-fit mb-5 px-2 py-1 rounded-md"
                >
                  <Image
                    src={icons[type]}
                    alt={type}
                    width={30}
                    height={30}
                    sizes="100vh"
                    className="inline"
                  />
                  <p className="font-bold text-xl">{capitalize(type)}</p>
                </div>
              ))}
            </>
          )}
          <div className="flex flex-wrap gap-2 justify-center">
            <p className="w-1/4 text-center text-xs bg-white font-bold px-2 py-1 rounded-md">
              HP: {base_stat.hp}
            </p>
            <p className="text-xs text-center bg-white font-bold w-fit px-2 py-1 rounded-md">
              ATTACK: {base_stat.attack}
            </p>
            <p className="text-xs text-center bg-white font-bold w-fit px-2 py-1 rounded-md">
              DEFENSE: {base_stat.defense}
            </p>
            <p className="text-xs text-center bg-white font-bold w-fit px-2 py-1 rounded-md">
              SP. ATTACK: {base_stat.specialAttack}
            </p>
            <p className="text-xs text-center bg-white font-bold w-fit px-2 py-1 rounded-md">
              SP. DEFENSE: {base_stat.specialDefense}
            </p>
            <p className="text-xs text-center bg-white font-bold w-fit px-2 py-1 rounded-md">
              SPEED: {base_stat.speed}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
