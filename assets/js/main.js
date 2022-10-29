
const pokemonList = document.getElementById('pokemonList')
const loadButton = document.getElementById('loading')
const all = document.getElementById('all')
const maxLimit = 1154
const limit = 8
let offset = 0

function converterPokemonTipoParaLi(pokemonTipo){
    return pokemonTipo.map((typeSlot) => `<li class="type ${typeSlot.type.name}">${typeSlot.type.name}</li>`)
}

function converterPokemonParaHTML(pokemon) {
    return `
        <li class="pokemon  ${pokemon.types[0].type.name}">
            <span class="number">#${pokemon.id}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${converterPokemonTipoParaLi(pokemon.types).join('')}
                </ol>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemon(offset, limit){
    pokeApi.getPokemon(offset, limit).then((listaPokemon = []) => {
        const novaHtml = listaPokemon.map(converterPokemonParaHTML).join('')
        pokemonList.innerHTML = novaHtml
    })
}

loadPokemon(offset, limit)

loadButton.addEventListener('click', ()=>{
    offset += limit
    loadPokemon(offset, limit)
})

all.addEventListener('click', ()=>{
    loadPokemon(0, 1154)
})