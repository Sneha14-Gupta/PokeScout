const POKEDEX = [
  { gen: 1, offset: 0, limit: 151 },
  { gen: 2, offset: 151, limit: 100 },
  { gen: 3, offset: 251, limit: 135 },
  { gen: 4, offset: 386, limit: 107 },
  { gen: 5, offset: 493, limit: 156 },
  { gen: 6, offset: 649, limit: 72 },
  { gen: 7, offset: 721, limit: 87 },
  { gen: 8, offset: 809, limit: 96 },
  { gen: 9, offset: 905, limit: 120 },
];

export async function fetchPokemonByGeneration(genNumber) {
  try {
    const genData = POKEDEX.find((g) => g.gen === genNumber);
    if (!genData) throw new Error("Invalid generation number");

    const { offset, limit } = genData;
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
    );
    const data = await response.json();
    console.log(data);

    const detailedPokemon = await Promise.all(
      data.results.map(async (pokemon) => {
        const detailsResponse = await fetch(pokemon.url);
        const details = await detailsResponse.json();
        return {
          id: details.id,
          name: details.name,
          types: details.types.map((t) => t.type.name) || [],
        };
      }),
    );

    const baseUrl = "https://img.pokemondb.net/sprites/home/normal/";
    const images = {};
    detailedPokemon.forEach((pokemon) => {
      images[pokemon.id] = `${baseUrl}${pokemon.name.toLowerCase()}.png`;
    });

    return { detailedPokemon, images };
  } catch (error) {
    console.error(`Error fetching Gen ${genNumber} Pokémon data:`, error);
    return { detailedPokemon: [], images: {} };
  }
}
