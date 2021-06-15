const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

var notesArr = [];

app.get("/api/notes", function(req, res){
    notesArr = JSON.parse(fs.readFileSync("./db/db.json", 'utf-8', null, 2));
    return res.json(notesArr);
});

app.post("/api/notes", function(req, res){
    notesArr = JSON.parse(fs.readFileSync("./db/db.json", 'utf-8'));
    var newNote = req.body;

    if(notesArr.length > 0){
        var lastId = notesArr[notesArr.length-1].id;
        newNote.id = lastId + 1;
    } else {
        newNote.id = 1;
    }

    notesArr.push(newNote);
    notesArr = JSON.stringify(notesArr);
    fs.writeFileSync("./db/db.json", notesArr);
    res.json(notesArr);
});

app.delete("/api/notes/:id", function(req,res){
    notesArr = JSON.parse(fs.readFileSync("./db/db.json"));
    console.log(notesArr);
    var deleteId = req.params.id;
    for(let i = 0; i < notesArr.length; i++){
        if(deleteId = notesArr[i].id){
            notesArr.splice(i, 1);
        }
    }
    notesArr = JSON.stringify(notesArr);
    fs.writeFileSync("./db/db.json", notesArr);
    res.json(notesArr);
})

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("*", function(req, res) {
    res.redirect('/');
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});