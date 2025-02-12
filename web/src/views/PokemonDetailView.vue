<template>
  <div>
    <h1>{{ pokemon?.name }}</h1>
    <img :src="pokemon?.image" :alt="pokemon?.name" />
    <div class="types">
      <span v-for="type in pokemon?.types" :key="type.type.name" :class="type.type.name">
        {{ type.type.name }}
      </span>
    </div>
    <div class="details">
      <p><strong>ID:</strong> {{ pokemon?.id }}</p>
      <p><strong>Height:</strong> {{ pokemon?.height }}</p>
      <p><strong>Weight:</strong> {{ pokemon?.weight }}</p>
      <p><strong>Base Experience:</strong> {{ pokemon?.base_experience }}</p>
      <div class="stats">
        <h3>Stats</h3>
        <ul>
          <li v-for="stat in pokemon?.stats" :key="stat.stat.name">
            <strong>{{ stat.stat.name }}:</strong> {{ stat.base_stat }}
          </li>
        </ul>
      </div>
      <div class="locations">
        <h3>Locations</h3>
        <ul>
          <li v-for="location in pokemon?.locations" :key="location.location_area.name">
            {{ location.location_area.name }}
          </li>
        </ul>
      </div>
    </div>
    <button @click="goBack">Voltar</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchPokemonById, type Pokemon } from '../services/pokemonService'
import '../assets/pokemonDetails.css'

const route = useRoute()
const router = useRouter()
const pokemon = ref<Pokemon | null>(null)

const loadPokemon = async () => {
  const id = route.params.id as string
  try {
    pokemon.value = await fetchPokemonById(parseInt(id))
  } catch (error) {
    console.error('Failed to load Pokémon:', error)
  }
}

const goBack = () => {
  router.push({ name: 'Home' })
}

onMounted(() => {
  loadPokemon()
})
</script>