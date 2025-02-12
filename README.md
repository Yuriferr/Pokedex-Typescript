# Pokedex-Typescript

Este é um projeto de Pokedex desenvolvido com Vue 3 e TypeScript. O objetivo deste projeto é exibir uma lista de Pokémons, permitir a pesquisa por nome ou número, e exibir detalhes completos de cada Pokémon.

## Funcionalidades

- Listagem de Pokémons com paginação
- Pesquisa de Pokémons por nome ou número
- Exibição de detalhes completos de cada Pokémon, incluindo status e localização
- Interface responsiva com tema escuro

## Tecnologias Utilizadas

- [Vue 3](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vue Router](https://router.vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Axios](https://axios-http.com/)

## Estrutura do Projeto

```plaintext
Pokedex-Typescript/
├── web/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── assets/
│   │   │   └── pokemonStyles.css
│   │   ├── components/
│   │   ├── services/
│   │   │   └── pokemonService.ts
│   │   ├── views/
│   │   │   ├── HomeView.vue
│   │   │   └── PokemonDetailView.vue
│   │   ├── App.vue
│   │   ├── main.ts
│   │   └── router/
│   │       └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
└── README.md
``` 

## Como Executar o Projeto

1. Clone o repositório: `git clone https://github.com/seu-usuario/Pokedex-Typescript.git`

2. Navegue até o diretório do projeto: `cd Pokedex-Typescript/web`

3. Instale as dependências: `npm install`

4. Execute o projeto: `npm run dev`

O projeto será executado em `http://localhost:5173`.

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo [LICENSE](LICENSE) para obter mais detalhes.
