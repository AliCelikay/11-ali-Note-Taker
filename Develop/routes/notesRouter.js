const NotesRouter = require('express').Router();
const path = require('path');

// GET Route for retrieving notes.html
NotesRouter.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'))
});

NotesRouter.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json' ))
});

NotesRouter.post('/api/notes', (req, res) => {
    console.log(`${req.method} method request recieved`);
    //Destructing the object properties in req.body
    const { title, text } = req.body;
    
    // If all the required properties are present in user input
    if (title && text) {
        // Variable for the object we will save
        const newNote = {
            title,
            text,
            note_id: uuidv4(),
        }
        //reading and appending (some content, 'to file path')
        readAndAppend(newNote, './db/db.json');
        
        //if all went well...
        const response = {
        status: 'success',
        body: newNote,
        };
        //...then we log response
        res.json(response);
    } 
    else {
        //if all didnt go well
        res.json('Error in posting new note');
    }

});

module.exports = NotesRouter;
