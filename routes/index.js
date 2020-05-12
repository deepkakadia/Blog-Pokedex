const pokedexRoutes = require("./pokedexRoutes");

const constructorMethod = app => {
    app.use("/api", pokedexRoutes);


    app.use("*", (req, res) => {
        res.status(404).json({ error: "Not found" });
    });
};

module.exports = constructorMethod;