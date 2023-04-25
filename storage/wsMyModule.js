export let wsMyModule = {
    async getApi(url) {
        try{
            const res = await fetch(url);
            const json = await res.json();
            console.log(json);
            return json
        } catch(error){
            console.log(`Ocurrió un error: ${error}`);
        }
    },
    async createP(url){
        let data = await this.getApi(url)
        console.log(data.results);
        let plantilla = "";
        data.results.forEach(async(val,id) => {
            console.log(val);
            async function getPokemon(){
                console.log(val.url);
                let dataPokemon = await this.getApi(val.url)
                console.log(dataPokemon);
            }
            getPokemon()
            plantilla+= `
            <div class="pokemon-block">
                <div class="img-container">
                    <img src="${val.sprites.front_default}">
                </div>
                <p>#${val.id.toString().padStart(3,0)}</p>
                <p class="name">${val.name}</p>
            </div>
            `
        });
        return plantilla
    }
}
self.addEventListener("message", async (e)=>{
    let respuesta = wsMyModule[`${e.data.module}`](e.data.data)
    postMessage(respuesta)
})