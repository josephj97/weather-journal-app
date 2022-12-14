// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require ('express');
const app = express();


// Start up an instance of app
const port = 8000;
const server = app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

//Get route to return the projectData object
app.get('/all',(req, res)=> {
    res.send(projectData);
});

//Post request to add the data to the projectData object
app.post('/post-data',(req, res) => {
    newEntry = {
        temp: req.body.temp,
        date: req.body.date,
        userFeeling: req.body.userFeeling,
    };
    projectData = newEntry;
});