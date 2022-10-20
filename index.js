const fs = require("fs");

const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

const password = process.env.POST_PASSWORD;

const games = require('./api/games');

app.use(express.json());
app.use(express.static('public'));

app.use("/api/games", games);

app.listen(PORT, () => console.log(`Working on Port ${PORT}`));

app.get("/", (req, res) => {
    res.sendFile("public/index.html");
});

module.exports = app;
