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


// This is the home page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

  //
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });

  app.get("/api/notes", function(req, res) {
    return res.json(notes);
  });

  app.post("/api/notes", function(req, res){
    let newNote = req.body;

    newNote.routeName = newNote.title.replace(/\s+/g, "").toLowerCase();

    console.log(newNote);

    notes.push(newNote);

    res.json(newNote);
  });
  

app.delete("/api/notes/:id", function(req, res){
    for(let i = 0; i < notes.length; i++) {
        if(notes[i].title === req.params.id) {
            notes.splice(i, 1);
        }
    }
});
  
  app.listen(PORT, function() {
    console.log("App listening on PORT http://localhost:" + PORT);
  });
  
