
const pokeApi = {}

pokeApi.getDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
}
pokeApi.getPokemon =  (offset = 0, limit = 10)=>{
    const URL = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    
    return fetch(URL)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemonList) => pokemonList.map(pokeApi.getDetail))
        .then((requests) => Promise.all(requests))
        .then((pokemonDetails) => pokemonDetails)
}

pokeApi.getPokemonUnico = (number)=>{
    const URL2 = `https://pokeapi.co/api/v2/pokemon/${number}`
    return fetch(URL2)
        .then((response) => response.json())
}
