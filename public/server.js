var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('../public'))
app.use(express.json());

app.delete("/api/notes/:id", (req, res) => {
    let id = req.params.id;
    
    var noteArray = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json")));

    noteArray = noteArray.filter((value) => { 
        if(value.id != id){
            return value;
        }
    })

    var reformattedData = JSON.stringify(noteArray);
    fs.writeFileSync(path.join(__dirname, "../db/db.json"), reformattedData);

    res.send("Success");
});

app.post("/api/notes", (req, res) => {
    var newNote = req.body;

    //get the saved data
    var noteArray = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json")));
    noteArray.push(newNote);

    var reformattedData = JSON.stringify(noteArray);
    fs.writeFileSync(path.join(__dirname, "../db/db.json"), reformattedData);

    res.send("Success");
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