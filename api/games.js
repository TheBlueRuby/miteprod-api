const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

require("dotenv").config();

import supabase from "../supabase-client.js";

//const password = process.env.POST_PASSWORD;

router.get("/", async (req, res) => {
    try {
        let { data: games, error } = await supabase.from("games").select("*");
        res.json({
            games: games,
        });
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        let { data: games, error } = await supabase.from("games").select("*");
        console.log(games);

        let gameIdIndex;

        for (let i = 0; i < games.length; i++) {
            let gameID = games[i].id;
            if (gameID == id) {
                gameIdIndex = i;
                break;
            }
        }

        games = games[gameIdIndex];
        console.log(games);

        res.json({
            displayName: games.displayName,
            author: games.author,
            version: games.version,
            download: games.download,
            img: games.img,
            desc: games.desc,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            status: 500,
            message: "Unknown Error!",
            error: err,
        });
    }
});

//commented for github file hosting
/*
router.post("/:id", (req, res) => {
    const { id } = req.params;
    const { displayName, author, version, download, pwd } = req.body;

    if (!displayName || !author || !version || !download) {
        res.status(400).send({ message: "Missing 1 or more parameters! Check you have included displayName, author, version and download URL." });
    }

    if (pwd == password) {
        let thereAreErrors = false;
        let error = '';

        fs.mkdirSync("/tmp/api/data/games/", { recursive: true }, (err) => {
            error = err;
            thereAreErrors = true;
        });

        fs.writeFileSync(`/tmp/api/data/games/${id}.json`, JSON.stringify(req.body), (err) => {
            error = err;
            thereAreErrors = true;
        });

        if (thereAreErrors) {
            console.error(error);
            res.status(500).json({
                status: "500",
                message: `Error, ${error}`,
            });
        } else {
            res.status(201).send({
                id: id,
            });
        }
    } else if (pwd) {
        res.status(403).send({ message: "Incorrect password" });
    } else {
        res.status(401).send({ message: "Please supply a password in the pwd field" });
    }
});*/

module.exports = router;

async function grabData(apiUrl) {
    try {
        let res = await fetch(apiUrl);
        return await res.json();
    } catch (error) {
        console.error(error);
        return error;
    }
}
