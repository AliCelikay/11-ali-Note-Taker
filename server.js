//grabbing packages
const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
//decunstructing functions from the file
const { readAndAppend, readFromFile, writeToFile } = require('./helpers/fsUtils');
const notesData = require('./db/db.json');
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

//In this route /api is necassary(as industry standard) or else just /notes will conflict with get /notes from line 34
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json' ))
});

//Get notes data from db.json as an object
app.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
})

//get the notes from the notesData(db.json) and return the notes
app.get('/api/notes/:id', (req, res) => {
    //saved the input url id
    const requestedID = req.params.id;
    //for ever element in notesData(db.json)...
    for(let i = 0; i < notesData.length; i++)
    {
        if(requestedID === notesData[i].id)
        {
            //..return it in to the front end
            return res.json(notesData[i]);
        }
    }
})

//Delete method for deleting a note
app.delete('/api/notes/:id', (req, res) => {
    //saved the input url id    
    const requestedID = req.params.id;
    //creating a new array
    let newDBArr = [];
    //loop through notesData
    for(let i = 0; i < notesData.length; i++)
    {
        //if requestedID != id from notesData, we dont push to the new array
        if (requestedID !== notesData[i].id) {
            //push every index except requestedID
            newDBArr.push(notesData[i]);
        }
    }
    //write the db.json file again in order to store new data w/o requestedID
    //('path', this parameter is already stringified to write to file)
    writeToFile('./db/db.json', newDBArr)
    //need to send a single res.json(with anything inside) in order for front end to execute a promise 
    res.json(newDBArr);
})

//Post notes information
app.post('/api/notes', (req, res) => {
    // console.log(`${req.method} method request recieved`);
    //Destructing the object properties in req.body
    const { title, text } = req.body;
    
    // If all the required properties are present in user input
    if (title && text) {
        // Variable for the object we will save
        const newNote = {
            //these
            title,
            text,
            // 'id' name as a key must match front end
            id: uuidv4(),
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
