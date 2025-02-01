import capitalize from "capitalize";
import Image from "next/image";
import { toMeter, toKilo } from "@/lib/converter";

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

export default async function PokemonInfo({ params }) {
  const { id } = params;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  const data = await res.json();
  const pokemonId = data.id;
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
  const backgroundStyle = {
    background:
      types.length === 2
        ? `linear-gradient(135deg, ${typeColors[types[0]][0]} 50%, ${typeColors[types[1]][0]} 50%)`
        : typeColors[types[0]][0], // Solid color if there's only one type
  };

  return (
    <div className="mx-auto min-h-screen space-y-6 px-5 py-10 md:w-full" style={backgroundStyle}>
      <section className="flex flex-col justify-start">
        <div className="mb-8 md:ml-8 md:mt-12 md:flex md:w-1/4 md:flex-col md:gap-2">
          <p className="text-xs text-white md:text-2xl md:font-medium">
            #{pokemonId}
          </p>
          <h1 className="text-xl font-extrabold text-white md:text-4xl">
            {name}
          </h1>
        </div>
        <div className="md:flex md:flex-row md:justify-center md:gap-4">
          <div className="flex flex-col md:w-fit md:flex-col">
            <p className="rounded-md p-1 text-lg font-semibold text-white md:mr-40 md:mt-52 md:bg-transparent md:text-lg">
              Height: {height.toFixed(1)}m
            </p>
            <p className="rounded-md p-1 text-lg font-semibold text-white md:bg-transparent md:text-lg">
              Weight: {weight.toFixed(1)}kg
            </p>
          </div>
          <div className="md:flex">
            <Image
              sizes="100vh"
              width={500}
              height={500}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
              alt={name}
              className="mb-4 mt-5 md:mr-44 md:h-96 md:w-96"
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-2 md:flex md:w-1/4 md:items-start">
            <div className="flex">
              {types.length > 0 && (
                <>
                  {types.map((type, index) => (
                    <div
                      key={index}
                      className="mb-5 flex w-fit items-center justify-center gap-1 rounded-md bg-white px-2 py-1 text-sm font-bold md:bg-transparent"
                    >
                      <Image
                        src={icons[type]}
                        alt={type}
                        width={30}
                        height={30}
                        sizes="100vh"
                        className="inline rounded-full bg-white md:h-16 md:w-16 md:p-2"
                      />
                      <div className="md:flex-cols md:flex">
                        <p className="text-xl font-bold md:hidden">
                          {capitalize(type)}
                        </p>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
            <p className="mb-6 w-full text-4xl font-extrabold text-white">
              Base Stats:
            </p>
            <div className="flex flex-wrap justify-center gap-4 border-l-4 pl-4 md:flex md:justify-start md:gap-4">
              <p className="md:text-md w-fit rounded-md bg-white px-3 py-1 text-center text-sm font-bold text-[#585858]">
                HP: {base_stat.hp}
              </p>
              <p className="md:text-md w-fit rounded-md bg-white px-3 py-1 text-center text-sm font-bold text-[#585858]">
                ATTACK: {base_stat.attack}
              </p>
              <p className="md:text-md w-fit rounded-md bg-white px-3 py-1 text-center text-sm font-bold text-[#585858]">
                DEFENSE: {base_stat.defense}
              </p>
              <p className="md:text-md w-fit rounded-md bg-white px-3 py-1 text-center text-sm font-bold text-[#585858]">
                SP. ATTACK: {base_stat.specialAttack}
              </p>
              <p className="md:text-md w-fit rounded-md bg-white px-3 py-1 text-center text-sm font-bold text-[#585858]">
                SP. DEFENSE: {base_stat.specialDefense}
              </p>
              <p className="md:text-md w-fit rounded-md bg-white px-3 py-1 text-center text-sm font-bold text-[#585858]">
                SPEED: {base_stat.speed}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
