
const pokemonList = document.getElementById('pokemonList')
const loadButton = document.getElementById('loading')
const all = document.getElementById('all')
const reset = document.getElementById('reset')
const maxLimit = 1154
const limit = 8
let offset = 0

function converterPokemonTipoParaLi(pokemonTipo) {
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
            <button class="btnStatus" type="button" onclick="chamarStatus(${pokemon.id})">
                Status
            </button>
        </li>
    `
}

function converterStatusHTML(pokemon) {
    return `
        <div class="status ${pokemon.types[0].type.name}">
            <span class="statusNumero">#${pokemon.id}</span>
            <span class="statusNome">${pokemon.name}</span>
            <div class="statusDetalhe">
                <ol class="statusTypes">
                    ${converterPokemonTipoParaLi(pokemon.types).join('')}
                </ol>
                <img class="statusImg" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png"alt="${pokemon.name}">
                <div class="statusBase">
                    <span> Status Base</span>
                    <ol>
                        <li>HP: ${pokemon.stats[0].base_stat}</li>
                        <li>ATK: ${pokemon.stats[1].base_stat}</li>
                        <li>DEF: ${pokemon.stats[2].base_stat}</li>
                        <li>SPA: ${pokemon.stats[3].base_stat}</li>
                        <li>SPD: ${pokemon.stats[4].base_stat}</li>
                        <li>SP: ${pokemon.stats[5].base_stat}</li>
                    </ol>
                </div>
            </div>
        </div>
    `
}

function chamarStatus(number) {

    pokeApi.getPokemonUnico(number).then((pokemon)=>{
        const novaHtml = converterStatusHTML(pokemon)
        pokemonList.innerHTML = novaHtml
    })
}

function loadPokemon(offset, limit) {
    pokeApi.getPokemon(offset, limit).then((listaPokemon = []) => {
        const novaHtml = listaPokemon.map(converterPokemonParaHTML).join('')
        pokemonList.innerHTML = novaHtml
    })
}

loadPokemon(offset, limit)

loadButton.addEventListener('click', () => {
    offset += limit
    loadPokemon(offset, limit)
})

all.addEventListener('click', () => {
    loadPokemon(0, 1154)
})

reset.addEventListener('click', () => {
    loadPokemon(0, 5)
})