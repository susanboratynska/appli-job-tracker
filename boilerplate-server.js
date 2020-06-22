const express = require('express');
const path = require('path');

const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());
app.use(express.json());

/**
 * Empty express boilerplate app - Sam Bebenek
 * 
 * The purpose of an Express server.js file is to act as the go-between for the front-end react app and the database, using API endpoints. It can also act as a router and serve pages,
 * although in our case it will only be serving the index page (once development is done and the react app is built), and all the routing will be done on the react side using 
 * react-router (for more information, look into react-router. One of the benefits is that it can allow for page changes without needing to reload the page).
 * 
 * API endpoints can be put in this file, or could possibly be put in another and then referenced here.
 * To run this express server, install the nodemon package globally in npm, then navigate to the folder containing this server.js file in a command terminal and run the command
 * 'nodemon server.js'
 * The benefit of the nodemon package is that if this server is running, nodemon will automatically refresh the server any time this server.js file is changed and saved.
 * 
 * NOTE: During development, react apps need to be hosted on a seperate command terminal. To run our react app, navigate to the application-tracker folder in a command terminal,
 * then run the command 'npm start'. The react app should open in your browser automatically.
 * To interface with the database during development, both the express app and the react app need to be running at the same time in two seperate command windows.
 * Once development is complete and the files are ready to be hosted, React apps can have a 'build' command run on them that will compile the react code into static html \
 * and javascript files. At that point, I believe only this Express app will need to be running to serve the new static build pages. 
 */




 
/***** EXTERNAL ROUTES *******/
const eventsRouter = require('./boilerplate-routes/networking-event-routes');

app.use('/api/events', eventsRouter);





 // An example api endpoint - that returns a short list of items. To see this list while the server is running, go to localhost:5000/api/getFruitList in your browser
app.get('/api/getFruitList', (req, res) => {
    var list = ["Apple", "Pear", "Orange"];
    res.json(list);
    console.log('Sent list of fruits (not from database)');
});


// Handles any requests that don't match any other API endpoints above -- only viewable once react app is built for production deployment
// build folder should automatically be created once the react app is built (after development is finished)
// this will then serve the index page for the react app. All routing should be done inside the react app with react-router.
// NOTE: if the build folder is in another place, the path string below should be changed.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/application-tracker/build/index.html'));
});


const port = process.env.PORT || 5000;
app.listen(port);

console.log('Express App is running and listening on port ' + port);