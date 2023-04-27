export default {
    numberStart: 0,
    numberEnd: 1008,
  
    api(){
        const pokemonContainer = document.querySelector(".pokemon-container")

        const ws = new Worker("storage/wsMyModule.js", {type: "module"})
        ws.postMessage({module: "createP", data: `https://pokeapi.co/api/v2/pokemon/?offset=${this.numberStart}&limit=${this.numberEnd}`})
        ws.addEventListener("message", (e)=>{
            let doc = new DOMParser().parseFromString(e.data, "text/html")
            pokemonContainer.append(...doc.body.children)
            ws.terminate();  
        })
    }
}