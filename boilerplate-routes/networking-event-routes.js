const router = require('express').Router();
let NetworkingEvent = require('../boilerplate-models/events.models');

//source - Ozzy's excercise project - thank you Ozzy
//https://github.com/2020-Summer-HTTP5303-A/project-and-learning-documentations-dreamteam/blob/master/documentation/OswaldoBrun/event-tracker/mern-event-tracker/backend/routes/events.js


//     ALL ENDPOINTS START WITH /api/events   -- ie. /api/events/getPublicEvents

//example route (returns a list of fruits)
router.route('/example').get((req, res) => {
    console.log("Sending example endpoint fruit list from Networking Events route to front end...");
    let exampleResponse = {
        fruits: ['peach', 'orange', 'apple']
    }
    res.json(exampleResponse);
});



//get all events
router.route('/getAllEvents').get((req, res) => {
    console.log('Sending all events to the front end...');
    //Mongoose's select all
    NetworkingEvent.find()
        .then(events => res.json(events))
        .catch(err => res.status(400).json('Error: ' + err))
});

//get by ID
router.route('/getEvent/:id').get((req, res) => {
    console.log('Sending event to the front end with this id: ' + req.params.id + '...');
    NetworkingEvent.findById(req.params.id)
        .then(event => res.json(event))
        .catch(err => res.status(400).json('Error: ' + err));
});

//get all public events
router.route('/getPublicEvents').get((req, res) => {
    console.log('Sending all public events to the front end...');
    NetworkingEvent.find({ 'isPublic': true })
        .then(events)
});

//get all events created by user with the given id
router.route('/getMyEvents/:id').get((req, res) => {
    console.log('Sending events created by user with this id: ' + req.params.id + '...');
    NetworkingEvent.find({ 'creatorID': req.params.id })
        .then(event => res.json(event))
        .catch(err => res.status(400).json('Error: ' + err));
});

//delete event with given id
router.route('/delete/:id').delete((req, res) => {
    console.log('Deleting event with this id: ' + req.params.id + '...');
    //TODO: if necessary, delete entries from bridging table
    NetworkingEvent.findByIdAndDelete(req.params.id)
        .then(() => res.status(200))
        .catch(err => res.status(400).json('Error: ' + err));
});




/**
 * Event request content:
 * name, description, date, location, link, host, rating, notes, isPublic
 */


//add an event
router.route('/add').post((req, res) => {
    console.log("Adding event to the database...");
    const name = req.body.name;
    const description = req.body.description;
    const date = Date.parse(req.body.date);
    const location = req.body.location;
    const link = req.body.link;
    const host = req.body.host;
    const rating = req.body.rating;
    const notes = req.body.notes;
    const isPublic = req.body.isPublic;

    const newEvent = new NetworkingEvent({
        name,
        description,
        date,
        location,
        link,
        host,
        rating,
        notes,
        isPublic,
        //TODO: add creatorID
    });

    newEvent.save()
        .then(() => res.json(newEvent)) //send the newly added event to the front end
        .catch(err => res.status(400).json('Error: ' + err));
});



//update event at the given id
router.route('/update/:id').post((req, res) =>{
    NetworkingEvent.findById(req.params.id)
        .then(event => {
            event.username = req.body.username;
            event.description = req.body.description;
            event.date = Date.parse(req.body.date);
            event.location = req.body.location;
            event.link = req.body.link;
            event.host = req.body.host;
            event.rating = req.body.rating;
            event.notes = req.body.notes;
            event.isPublic = Boolean(req.body.isPublic);
            //creatorID doesn't need to be updated

            event.save()
            .then(() => res.json(event)) //send updated entry to the front end
            .catch(err => res.status(400).json('Error: '+ err));
        })        
        .catch(err => res.status(400).json('Error: ' + err));
});




//always have this at the end of the page when using router
module.exports = router;