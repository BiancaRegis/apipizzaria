import fs from 'node:fs/promises';

async function lerCardapio() {
   try {
    const cardapio = await fs.readFile('pizzas.txt', 'utf-8')
    console.log(cardapio)
   } catch (error) {
    console.error(`deu ruim fi ${error}`)
   } 
}
lerCardapio();