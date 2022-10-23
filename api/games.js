const fs = require("fs");
const express = require("express");
const path = require("path");
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
        fileContents = fs.readFileSync(`/tmp/api/data/games/${id}.json`, "utf-8");
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
            path: path.resolve(`/tmp/api/data/games/${id}.json`),
        });
    }
});

router.post("/:id", (req, res) => {
    const { id } = req.params;
    const { displayName, author, version, download, pwd } = req.body;

    if (!displayName || !author || !version || !download) {
        res.status(400).send({ message: "Missing 1 or more parameters! Check you have included displayName, author, version and download URL." });
    }

    if (pwd == password) {
        fs.mkdir("/tmp/api/data/games", { recursive: true }, (err) => {
            console.error(err);
            res.status(500).json({
                status: "500",
                message: `Error, Could Not Create /tmp/api/data/games/ !`,
            });
        });

        fs.writeFile(`/tmp/api/data/games/${id}.json`, JSON.stringify(req.body), (err) => {
            console.error(err);
            res.status(500).json({
                status: "500",
                message: `Error, Could Not Create /tmp/api/data/games/${id}.json !`,
            });
        });

        res.status(201).send({
            id: id,
        });
    } else if (pwd) {
        res.status(403).send({ message: "Incorrect password" });
    } else {
        res.status(401).send({ message: "Please supply a password in the pwd field" });
    }

    res.status(503).send({
        status: "503",
        message: "Unknown Error",
    });
});

module.exports = router;
