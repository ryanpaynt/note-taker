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
    notesArr = JSON.parse(fs.readFileSync("./db/db.json", 'utf-8'));
    return res.json(notesArr);
});

app.post("/api/notes", function(res, req){
    notesArr = JSON.parse(fs.readFileSync("./db/db.json", 'utf-8'));
    var newNote = req.body;
    notesArr.concat(newNote);
    res.json(notesArr);
});

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