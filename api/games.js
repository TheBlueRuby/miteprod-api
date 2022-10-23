const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

//const password = process.env.POST_PASSWORD;

router.get("/", (req, res) => {
    try {
        res.json({
            games: ["apocdoom", "bkrooms-first-contact", "bkrooms-first-contact-scratch"],
        });
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        gameData = await grabData(`https://raw.githubusercontent.com/TheBlueRuby/miteprod-api/master/data/games/${id}.json`);
        console.log(gameData);

        res.json({
            displayName: gameData.displayName,
            author: gameData.author,
            version: gameData.version,
            download: gameData.download,
            img: gameData.img,
            desc: gameData.desc,
        });
    } catch (err) {
        return res.status(404).send({
            status: 404,
            message: "Not Found!",
            path: `https://raw.githubusercontent.com/TheBlueRuby/miteprod-api/master/data/games/${id}.json`,
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