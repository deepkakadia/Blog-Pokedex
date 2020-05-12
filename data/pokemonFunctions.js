const mongoCollections = require('./mongoCollection');
const pokemons = mongoCollections.pokemons;
const { ObjectId } = require("mongodb").ObjectId;

async function createPokemon(name, rank, photo = "null") {
    // name and rank are required fields whereas photo isnt 
    if (!name || typeof (name) !== "string") throw "You must provide a name for your pokemon";
    if (!rank || typeof (rank) !== "number") throw "You must provide rank for your pokemon";

    //awaiting the collection "pokemon" from mongodb
    const pokemonCollection = await pokemons();

    let newpokemon = {
        name: name,
        rank: rank,
        photo: photo
    };
    const insertInfo = await pokemonCollection.insertOne(newpokemon);
    if (insertInfo.insertedCount === 0) throw "Could not add pokemon";

    const newId = insertInfo.insertedId;
    const poke = await getPokemon(newId);
    return poke;
}

async function getAll() {
    const pokemonCollection = await pokemons();
    //mongo query which returns all entries in the collection
    const a1 = await pokemonCollection.find({}).toArray();
    //error check to see if there are no current pokemons
    if (!a1) throw "No pokemons are currently present";
    return a1;
}

async function getPokemon(id) {
    const pokemonCollection = await pokemons();
    const user = await pokemonCollection.findOne({ _id: ObjectId(id) });
    //error check if no pokemon with that id
    if (!user) throw 'Pokemon not found';
    return user;
}

async function removePokemon(id) {
    if (!id) throw 'You must provide an id for deleting Pokemon';
    if (!ObjectId.isValid(id)) throw "Please input a valid Id of Pokemon"
    const pokemonCollection = await pokemons();
    const deletionInfo = await pokemonCollection.removeOne({ _id: ObjectId(id) });
    if (deletionInfo.deletedCount === 0) {
        throw `Could not delete pokemon with id of ${id}`;
    }
    else {
        return {
            deleted: true,
        }
    }
}

async function updatePokemon(id, newName, newRank) {
    if (!id) throw 'You must provide an id for Pokemon';
    if (!ObjectId.isValid(id)) throw "Please input a valid Id"
    if (!newName || typeof (newName) !== "string") throw "You must provide new name";
    if (!newRank || typeof (newRank) !== "number") throw "You must provide new rank";
    const pokemonCollection = await pokemons();
    const updatedpokemon = {
        name: newName,
        rank: newRank,
    };
    const updatedInfo = await pokemonCollection.updateOne({ _id: ObjectId(id) }, { $set: updatedpokemon });
    if (updatedInfo.modifiedCount === 0) {
        throw 'could not update pokemon successfully';
    }
    return await getPokemon(id);
}

module.exports = {
    getPokemon,
    getAll,
    createPokemon,
    updatePokemon,
    removePokemon
}