
async function pokemon() {
    const ids = [160, 189, 54, 60, 75, 45, 86, 78, 26, 20];
    const container = document.getElementById("product-container")
    
    const results = await Promise.all(
        ids.map(async (id) => {
            let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            return response.json();
        })
    )

    results.forEach((pokemon) => {
        let card = `
            <div class="col-md-3 col-sm-6">
                <div class="card shadow-sm h-100">
                    <img src="${pokemon.sprites.other.dream_world.front_default}" class="card-img-top" alt="pokemon">
                        <div class="card-body">
                            <h4 class="card-title text-warning">${pokemon.forms[0].name}</h4>
                            <p class="text-danger fw-bold">HP : ${pokemon.stats[0].base_stat}</p>
                            <p class="text-success fw-bold">Speed : ${pokemon.stats[5].base_stat}</p>
                            <p class="text-info fw-bold">attack: ${pokemon.stats[2].base_stat}</p>
                            <p class="text-info-emphasis fw-bold">special-attack: ${pokemon.stats[3].base_stat}</p>
                            <p class="text-warning mb-0"></p>
                        </div>
                </div>
            </div>
        `
        container.innerHTML += card;
    });
}

pokemon();