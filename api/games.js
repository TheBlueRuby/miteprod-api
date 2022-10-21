const fs = require('fs');
const express = require("express");
const path = require('path');
const router = express.Router();

const password = process.env.POST_PASSWORD;

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

router.get("/:id", (req, res) => {
    const id = req.params.id;

    try {
        fileContents = fs.readFileSync(`api/data/games/${id}.json`, "utf-8");
        gameData = JSON.parse(fileContents);

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
            path: path.resolve(`api/data/games/${id}.json`)
        });
    }

});

module.exports = router;
