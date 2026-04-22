const express = require('express')
const cors = require('cors')

const app = express();

app.use(cors())

app.get('/api/pokemon', async (req, res) => {
   // calls api
    const api2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${req.query.name}`)
    //converts to jason
    const cardinfo = await api2.json()

    // map type of pokemon to energy
    const energy = {
        fire: 'Fire',
        water: 'Water',
        grass: 'Grass',
        steel: 'Metal',
        dark: 'Darkness',
        fighting: 'Fighting',
        electric: 'Lightning',
        fairy: 'Colorless',
        normal: 'Colorless',
        psychic: 'Psychic',
    }

    res.json({
        pokemonname: cardinfo.name,
        hp: cardinfo.stats[0].base_stat,
        length: cardinfo.height / 10,
        weight:  cardinfo.weight /10,
        energy2: energy[cardinfo.types[0].type.name]
    })
})

app.listen(3000, () => console.log('server is now running on pirt 3000'))