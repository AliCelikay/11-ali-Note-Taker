const notesRoute = require('express').Router();
const path = require('path');

// GET Route for retrieving notes.html
notesRoute.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});

module.exports = notesRoute;
