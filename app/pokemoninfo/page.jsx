import capitalize from "capitalize";
import Header from "@/components/Header";
import Image from "next/image";

export default async function PokemonInfo() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon/1/");
  const data = await res.json();
  const id = data.id;
  const name = capitalize(data.name);
  if (data.types.length === 2) {
    const types = {
      type1: data.types[0].type.name,
      type2: data.types[1].type.name,
    };
  } else {
    const types = {
      type1: data.types[0].type.name,
    };
  }
  const height = data.height;
  const weight = data.weight;
  let base_stat_name = {
    hp: data.stats[0].stat.name,
    attack: data.stats[1].stat.name,
    defense: data.stats[2].stat.name,
    specialAttack: data.stats[3].stat.name,
    specialDefense: data.stats[4].stat.name,
    speed: data.stats[5].stat.name,
  };
  let base_stat = {
    hp: data.stats[0].base_stat,
    attack: data.stats[1].base_stat,
    defense: data.stats[2].base_stat,
    specialAttack: data.stats[3].base_stat,
    specialDefense: data.stats[4].base_stat,
    speed: data.stats[5].base_stat,
  };

  return (
    <div className="h-screen bg-yellow-300 px-10 space-y-6 ">
      <Header />
      <section>
        <div className="w-1/4">
          <p>{id}</p>
          <h1>{name}</h1>
        </div>
        <div className="w-2/4">
          <Image
            sizes="100vh"
            width={300}
            height={300}
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/160.svg"
            alt="pokemonName"
          />
        </div>
        <div className="w-1/4">
          <p>{types.type1}</p>
          <p>{types.type2}</p>
          <p>{height}</p>
          <p>{weight}</p>
          <p>{base_stat_name.hp}</p>
          <p>{base_stat_name.attack}</p>
          <p>{base_stat_name.defense}</p>
          <p>{base_stat_name.specialAttack}</p>
          <p>{base_stat_name.specialDefense}</p>
          <p>{base_stat_name.speed}</p>
        </div>
      </section>
    </div>
  );
}
