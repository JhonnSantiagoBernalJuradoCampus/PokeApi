export let wsMyModule = {
    async getApi(url) {
      try {
        const res = await fetch(url);
        const json = await res.json();
        console.log(json);
        return json;
      } catch (error) {
        console.log(`Ocurrió un error: ${error}`);
      }
    },
    async createP(url) {
        let data = await this.getApi(url);
        let promises = data.results.map(async (val, id) => {
          let dataPokemon = await this.getApi(`${val.url}`);
          let template = `
            <div class="pokemon-block">
                <div class="img-container">
                    <img src="${dataPokemon.sprites.front_default}">
                </div>
                <p>#${dataPokemon.id.toString().padStart(3, 0)}</p>
                <p class="name">${dataPokemon.name}</p>
            </div>
        `;
        return template;
        });
        let pokemonData = await Promise.all(promises);
        let template = pokemonData.join('');
        return template;
    }
        
    }  
self.addEventListener("message", async (e) => {
    let respuesta = await wsMyModule[`${e.data.module}`](e.data.data);
    postMessage(respuesta);
});