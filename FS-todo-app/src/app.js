const { readFile, writeFile } = require("fs");
const express = require("express");

const app = express();

//Add note
const addNotes = (id, title, body) => {
  //generate auto id
  //create notes json file if not exists
  //add notes to this file
  console.log("Note added");
  //handle duplicate notes
};

//Remove note
const removeNote = (id) => {
  //
};

//Remove ALL notes
const clearNotes = () => {
  //delete notes.json file
};
//Edit note
const editNote = (id) => {
  //edit note
  //add later
};

app.listen(3000, () => {
  console.log("Server started on 3000");
});
