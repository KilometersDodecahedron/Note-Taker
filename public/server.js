var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('../public'))
app.use(express.json());

app.post("/api/notes", (req, res) => {
    var newNote = req.body;

    var noteArray = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json")));
    noteArray.push(newNote);

    var reformattedData = JSON.stringify(noteArray);
    fs.writeFileSync(path.join(__dirname, "../db/db.json"), reformattedData);
});

app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../db/db.json"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "notes.html"));
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

//makes the server work
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});