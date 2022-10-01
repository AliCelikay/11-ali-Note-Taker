//grabbing packages
const express = require('express');
const path = require('path');
//Backend index.js package
const api = require('./routes/index.js');

//creating a ports, 1 for heroku and one preset port
const PORT = process.env.PORT || 3001;

//grabbing experss function from the express package
const app = express();

//middleware for interpretation of user input and protection
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//
app.use('/api/notes', api);

//the public folder will be static
app.use(express.static('public'));


//Get route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public'))
});

//route listens to the port in terminal
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT} 🚀`);
})
