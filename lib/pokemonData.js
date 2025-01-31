export async function fetchPokemonData() {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
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
  
      const baseUrl = "https://img.pokemondb.net/sprites/home/normal/";
      const images = {};
      detailedPokemon.forEach((pokemon) => {
        images[pokemon.id] = `${baseUrl}${pokemon.name.toLowerCase()}.png`;
      });
  
      return { detailedPokemon, images };
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
      return { detailedPokemon: [], images: {} };
    }
  }
  