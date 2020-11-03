// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8050;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.json());

const notes = [];
const ids = [];


// This is the home page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

//serve the file notes.html
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//returns the array notes as a json file
app.get("/api/notes", function (req, res) {
    return res.json(notes);
});

//posts the notes input to api
app.post("/api/notes", function (req, res) {
    let newNote = req.body;

    newNote.routeName = newNote.title.replace(/\s+/g, "").toLowerCase();

    if(!ids.includes(newNote.title)) {
        notes.push(newNote);
        ids.push(newNote.title);
    
        res.json(newNote);
    
    }
  
});

//deletes notes array
app.delete("/api/notes/:id", function (req, res) {
    if (ids.includes(req.params.id)) {
        notes.splice(ids.indexOf(req.params.id, 1));
        ids.splice(ids.indexOf(req.params.id, 1));
    }
});

app.listen(PORT, function () {
    console.log("App listening on PORT http://localhost:" + PORT);
});

