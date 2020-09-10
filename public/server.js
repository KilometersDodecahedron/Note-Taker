var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();
//lets it work both local and hosted
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
//designates the directory/folder the server.js script as accessable as static scripts
app.use(express.static(__dirname));
app.use(express.json());

//delete a saved note
app.delete("/api/notes/:id", (req, res) => {
    let id = req.params.id;
    
    var noteArray = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json")));

    //creates a new note array of every note, except the one that's being deleted
    noteArray = noteArray.filter((value) => { 
        if(value.id != id){
            return value;
        }
    });

    var reformattedData = JSON.stringify(noteArray);
    fs.writeFileSync(path.join(__dirname, "../db/db.json"), reformattedData);

    //the actual contents of the responce doesn't matter in this case
    //it just needs a responce so the function's Promises will run
    res.send("Success");
});

//save a new note
app.post("/api/notes", (req, res) => {
    var newNote = req.body;

    //get the saved data
    var noteArray = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json")));
    noteArray.push(newNote);

    var reformattedData = JSON.stringify(noteArray);
    fs.writeFileSync(path.join(__dirname, "../db/db.json"), reformattedData);

    //the actual contents of the responce doesn't matter in this case
    //it just needs a responce so the function's Promises will run
    res.send("Success");
});

//get the saved notes
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../db/db.json"));
});

//route to the "notes" page
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "notes.html"));
});

//route to the home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

//set the home page as the default route
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

//makes the server work
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});