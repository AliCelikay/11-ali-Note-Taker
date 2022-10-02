const NotesRouter = require('express').Router();
const path = require('path');

// GET Route for retrieving notes.html
NotesRouter.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'))
});

module.exports = NotesRouter;
