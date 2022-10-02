//grabbing packages
const express = require('express');
const path = require('path');
//Backend index.js package
const api = require('./routes/index.js');
// const notesRouter = require('./routes/notesRouter.js');

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

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
  });

//route listens to the port in terminal
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT} 🚀`);
})
