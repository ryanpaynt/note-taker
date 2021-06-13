const express = require("express");
const path = require("path");
const fs = require("fs");
const { response } = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

const public = path.resolve(__dirname, "public");

app.use("/assets", express.static(__dirname + "/assets"));
app.use("/db", express.static(__dirname + "/db"));

var notesArr = [];

function updNoteList(notesArr){
    notesArr = JSON.stringify(notesArray);
    fs.writeFileSync("./db/db.json", notesArr);
}

app.get("/api/notes", function(req, res){
    notesArr = JSON.parse(fs.readFileSync("./db/db.json"));
    let newNote = request.body;

    if (typeof notesArray !== 'undefined' && notesArray.length > 0) {
        let lastNoteId = notesArray[notesArray.length - 1].id;
        newNote.id = lastNoteId + 1;
    } else {
        newNote.id = 1;
    }
    notesArr.push(newNote);
    updNoteList(notesArr);
    response.end();
});

app.delete("/api/notes/:id", function(req, res) {
    notesArr = JSON.parse(fs.readFileSync("./db/db.json"));
    let noteToDeleteId = req.params.id;
    console.log(noteToDeleteId);
    for (var i = 0; i < notesArr.length; i++) {
        if (noteToDeleteId == notesArr[i].id) {
            notesArr.splice(i, 1);
        }
    }
    updateNotes(notesArr);
    res.end();
});

app.get("/", function(req, res) {
    response.sendFile(path.join(public, "index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(public, "notes.html"));
});

app.get("*", function(req, res) {
    res.redirect('/');
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});