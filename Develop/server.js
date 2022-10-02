//grabbing packages
const express = require('express');
const path = require('path');
//
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('./helpers/fsUtils');
//Backend index.js package
// const api = require('./routes/index.js');

//creating a ports, 1 for heroku and one preset port
const PORT = process.env.PORT || 3001;

//grabbing experss function from the express package
const app = express();

//middleware for interpretation of user input and protection
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//the public folder will be static
app.use(express.static('public'));

//Main router
// app.use('/api', api);

//Get route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

//Comment here out
//Get rought for notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

//
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json' ))
});

//Post notes information
app.post('/notes', (req, res) => {
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

//route listens to the port in terminal
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT} 🚀`);
})
