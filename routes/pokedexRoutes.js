const express = require("express");
const router = express.Router();
const pokemonData = require("../data/pokemonFunctions");

router.get("/", async (req, res) => {
    try {
        const pokemon = await pokemonData.getAll();
        res.json(pokemon)
    }
    catch (e) {
        res.status(404).json({ message: e })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const poke1 = await pokemonData.getPokemon(req.params.id);
        res.json(poke1);
    } catch (e) {
        res.status(404).json({ message: "not found!" });
    }
});

router.put('/:id', async (req, res) => {
    let pokeInfo = req.body;

    if (!pokeInfo) {
        res.status(400).json({ error: 'You must provide data to update animal' });
        return;
    }

    if (!pokeInfo.name) {
        res.status(400).json({ error: 'You must provide name' });
        return;
    }
    if (!pokeInfo.rank) {
        res.status(400).json({ error: 'You must provide rank' });
        return;
    }

    try {
        await pokemonData.getPokemon(req.params.id);
    } catch (e) {
        res.status(404).json({ error: 'Pokemon not found' });
        return;
    }
    try {
        const updatedpokemon = await pokemonData.updatePokemon(req.params.id, pokeInfo.name, pokeInfo.rank);
        res.json(updatedpokemon);
    } catch (e) {
        res.status(400).json({ error: e });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const poke1 = await pokemonData.removePokemon(req.params.id);
        res.json(poke1);
    } catch (e) {
        res.status(404).json({ message: "not found!" });
    }
});

router.post("/", async (req, res) => {
    let pokeInfo = req.body;

    if (!pokeInfo.name) {
        res.status(400).json({ error: 'You must provide name' });
        return;
    }

    if (!pokeInfo.rank) {
        res.status(400).json({ error: 'You must provide rank' });
        return;
    }

    try {
        const newpokemon = await pokemonData.createPokemon(pokeInfo.name, pokeInfo.rank);
        res.json(newpokemon);
    } catch (e) {
        res.sendStatus(500);
    }
});

module.exports = router;