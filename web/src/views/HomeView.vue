<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { fetchPokemons, searchPokemon, type Pokemon } from '../services/pokemonService'
import '../assets/pokemonStyles.css'

const pokemons = ref<Pokemon[]>([])
const offset = ref(0)
const limit = 27
const searchQuery = ref('')
const router = useRouter()

const loadPokemons = async () => {
  try {
    pokemons.value = await fetchPokemons(offset.value, limit)
  } catch (error) {
    console.error('Failed to load Pokémon:', error)
  }
}

const search = async () => {
  if (searchQuery.value) {
    const result = await searchPokemon(searchQuery.value)
    if (result) {
      pokemons.value = [result]
    } else {
      pokemons.value = []
    }
  } else {
    loadPokemons()
  }
}

const nextPage = () => {
  offset.value += limit
  loadPokemons()
}

const prevPage = () => {
  if (offset.value > 0) {
    offset.value -= limit
    loadPokemons()
  }
}

const goToPokemonDetail = (id: number) => {
  router.push({ name: 'PokemonDetail', params: { id } })
}

onMounted(() => {
  loadPokemons()
})

watch(searchQuery, search)
</script>

<template>
  <main>
    <h1>Pokémon List</h1>
    <div class="search-bar">
      <input v-model="searchQuery" @input="search" placeholder="Search by name or number" />
    </div>
    <ul>
      <li v-for="pokemon in pokemons" :key="pokemon.name" :class="pokemon.types[0].type.name" @click="goToPokemonDetail(pokemon.id)">
        <div class="pokedex-number">#{{ pokemon.id }}</div>
        <img :src="pokemon.image" :alt="pokemon.name" />
        <div>
          <h2>{{ pokemon.name }}</h2>
          <div class="types">
            <span v-for="type in pokemon.types" :key="type.type.name" :class="type.type.name">
              {{ type.type.name }}
            </span>
          </div>
        </div>
      </li>
    </ul>
    <div class="pagination">
      <button @click="prevPage" :disabled="offset === 0">Anterior</button>
      <button @click="nextPage">Próximo</button>
    </div>
  </main>
</template>