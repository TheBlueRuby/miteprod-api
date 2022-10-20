const fs = require("fs");

const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

const password = process.env.POST_PASSWORD;

const games = require(process.cwd() + '/api/games');

app.use(express.json());
app.use(express.static('public'));

app.use("/games", games);

app.listen(PORT, () => console.log(`Working on Port ${PORT}`));

app.get("/", (req, res) => {
    res.sendFile(process.cwd() + "/public/index.html");
});

app.get("/status", (req, res) => {
    res.status(200).json({status: "200", message: "Working fine so far!"});
});

module.exports = app;
