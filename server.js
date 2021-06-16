const express = require("express");
const path = require("path");
const fs = require("fs");
const notesArr = require('./db/db.json');
const { type } = require("os");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const updNotes = (arr) => {
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(arr));

}

const deleteNotes = (id, arr) => {
    for (var i = 0; i < arr.length; i++) {
        var note = arr[i];
        if (note.id == id) {
            arr.splice(i, 1);
            updNotes(arr);
            return;
        }
    }
}

const newNote = (body, arr) => {
    const newNote = body;
    if (arr.length > 0) {
        let lastNoteId = arr[arr.length - 1].id;
        newNote.id = lastNoteId + 1;
    } else {
        newNote.id = 1;
    }
    arr.push(newNote);
    updNotes(arr)
    return newNote;
}

app.get("/api/notes", function (req, res) {
    res.json(notesArr);
});

app.post("/api/notes", function (req, res) {
    const newestNote = newNote(req.body, notesArr);
    res.json(newestNote);
});

app.delete("/api/notes/:id", function (req, res) {
    console.log(req.params);
    deleteNotes(req.params.id, notesArr);
    res.json(true);
})

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("*", function (req, res) {
    res.redirect('/');
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});