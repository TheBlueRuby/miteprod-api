const fs = require("fs");

const express = require("express");
const app = express();

const PORT = 8080;

const password = fs.readFileSync('./pwd.txt', 'utf8', function (err,data) {
    if (err) {
      return console.err(err);
    }
    console.log(data);
  });

app.use(express.json());

app.listen(PORT, () => console.log(`Working on Port ${PORT}`));

app.get("/games", (req, res) => {
    res.status(200).send({
        games: ["apocdoom", "bkrooms-first-contact"],
    });
});

app.get("/games/:id", (req, res) => {
    const id = req.params.id;

    try {
        fileContents = fs.readFileSync(`data/games/${id}.json`, "utf-8");
        gameData = JSON.parse(fileContents);
    } catch (err) {
        return res.sendStatus(404);
    }

    res.json({
        displayName: gameData.displayName,
        author: gameData.author,
        version: gameData.version,
        download: gameData.download,
    });

});

app.post("/games/:id", (req, res) => {
    const { id } = req.params;
    const { displayName, author, version, download, pwd } = req.body;

    if (!displayName || !author || !version || !download) {
        res.status(418).send({ message: "Missing 1 or more parameters! Check you have included displayName, author, version and download URL." });
    }

    if (pwd == password) {
        fs.mkdir("data/games", { recursive: true }, (err) => {
            console.err(err);
        });

        fs.writeFile(`data/games/${id}.json`, JSON.stringify(req.body), (err) => {
            console.err(err);
        });

        res.status(201).json({
            id: id,
        });
    } else if (pwd) {
        res.status(403).send({message: 'Incorrect password'});
    } else {
        res.status(401).send({message: 'Please supply a password in the pwd field'});
    }
});
