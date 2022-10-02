const express = require('express');

// Import our modular routers for html notes screen and 
const notesRouter = require('./notesRouter.js');

const app = express();

//Initializing notes.html route
app.use('/api/notes', notesRouter);

module.exports = app;

