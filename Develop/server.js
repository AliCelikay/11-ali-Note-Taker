const express = require('express');
const path = require('path');

const port = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

//Get route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/'))
});

app.listen(PORT, () => {
    console.log("App listening at http://localhost:${PORT} 🚀");
})
