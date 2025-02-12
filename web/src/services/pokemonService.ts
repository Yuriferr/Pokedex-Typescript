export interface Pokemon {
  id: number
  name: string
  image: string
  types: { type: { name: string } }[]
  height: number
  weight: number
  base_experience: number
  stats: { base_stat: number, stat: { name: string } }[]
  locations: { location_area: { name: string } }[]
}

export const fetchPokemons = async (offset = 0, limit = 27): Promise<Pokemon[]> => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
    const data = await response.json()
    const detailedPokemons = await Promise.all(
      data.results.map(async (pokemon: { name: string; url: string }) => {
        const res = await fetch(pokemon.url)
        const details = await res.json()
        return {
          id: details.id,
          name: details.name,
          image: details.sprites.front_default,
          types: details.types,
          height: details.height,
          weight: details.weight,
          base_experience: details.base_experience,
          stats: details.stats,
          locations: await fetchPokemonLocations(details.id)
        }
      })
    )
    return detailedPokemons
  } catch (error) {
    console.error('Error fetching Pokémon:', error)
    throw error
  }
}

export const searchPokemon = async (query: string): Promise<Pokemon | null> => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`)
    if (!response.ok) throw new Error('Pokémon not found')
    const details = await response.json()
    return {
      id: details.id,
      name: details.name,
      image: details.sprites.front_default,
      types: details.types,
      height: details.height,
      weight: details.weight,
      base_experience: details.base_experience,
      stats: details.stats,
      locations: await fetchPokemonLocations(details.id)
    }
  } catch (error) {
    console.error('Error searching Pokémon:', error)
    return null
  }
}

export const fetchPokemonById = async (id: number): Promise<Pokemon> => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    if (!response.ok) throw new Error('Pokémon not found')
    const details = await response.json()
    return {
      id: details.id,
      name: details.name,
      image: details.sprites.front_default,
      types: details.types,
      height: details.height,
      weight: details.weight,
      base_experience: details.base_experience,
      stats: details.stats,
      locations: await fetchPokemonLocations(details.id)
    }
  } catch (error) {
    console.error('Error fetching Pokémon by ID:', error)
    throw error
  }
}

export const fetchPokemonLocations = async (id: number): Promise<{ location_area: { name: string } }[]> => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/encounters`)
    if (!response.ok) throw new Error('Locations not found')
    const locations = await response.json()
    return locations
  } catch (error) {
    console.error('Error fetching Pokémon locations:', error)
    throw error
  }
}