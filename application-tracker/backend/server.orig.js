const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const appliRoutes = express.Router();
const PORT = 4000;

let Jobapp = require('./models/jobapp.model.js');
let Contact = require('./models/contact.model.js');



app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/appli-job-app-tracker', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})


// ---------- Job Application End Points ---------- //

// Bring in endpoints; .route is extends: app.use('/jobapp', appliRoutes); therefore it needs the /
// Sending a get request to localhost PORT 4000/jobapp/
// To accept get requests, you need to call .get and takes a callback function

// Endpoint 1 - Show All Job Applications:
appliRoutes.route('/jobapps').get(function(req, res){
    Jobapp.find(function(err, jobapp){
        if (err) {
            console.log(err);
        } else {
            res.json(jobapp);
        }
    });
});

// Endpoint 2 - Show a single Job Application:
appliRoutes.route('/jobapps/:id').get(function(req, res){
    let id = req.params.id;
    Jobapp.findById(id, function(err, jobapp){
        res.json(jobapp);
    });
});

// Endpoint 3 - Add New Job Application:
appliRoutes.route('/jobapps/add').post(function(req, res){
    let jobapp = new Jobapp(req.body);
    jobapp.save()
        .then(jobapp => {
            res.status(200).json({'jobapp': 'jobapp added successully'});
        })
        .catch(err => {
            res.status(400).send('Adding new jobapp failed')
        });

})


// Endpoint 4 - Update a Job Application:
appliRoutes.route('/jobapps/update/:id').post(function(req, res) {
    Jobapp.findById(req.params.id, function(err, jobapp){
        if (!jobapp)
            res.status(404).send("Data not found");
        else
            jobapp.jobapp_title = req.body.jobapp_title;
            jobapp.jobapp_description = req.body.jobapp_description;
            jobapp.jobapp_postlink = req.body.jobapp_postlink;
            jobapp.jobapp_postingID = req.body.jobapp_postingID;
            jobapp.jobapp_companyname = req.body.jobapp_companyname;
            jobapp.jobapp_companyphone = req.body.jobapp_companyphone;
            jobapp.jobapp_companywebsite = req.body.jobapp_companywebsite;
            jobapp.jobapp_applydate = req.body.jobapp_applydate;
            jobapp.jobapp_followupdate = req.body.jobapp_followupdate;
            jobapp.jobapp_contactfirstname = req.body.jobapp_contactfirstname;
            jobapp.jobapp_contactlastname = req.body.jobapp_contactlastname;
            jobapp.jobapp_contactphone = req.body.jobapp_contactphone;
            jobapp.jobapp_contactemail = req.body.jobapp_contactemail;
            jobapp.jobapp_resume = req.body.jobapp_resume;
            jobapp.jobapp_cv = req.body.jobapp_cv;
            jobapp.jobapp_notes = req.body.jobapp_notes;
            jobapp.jobapp_status = req.body.jobapp_status;

            jobapp.save()
                .then(jobapp => {
                    res.json('Jobapp updated')
                })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
    });
})

// ---------- Contacts End Points ---------- //

// Endpoint 1 - Show All Contacts:
appliRoutes.route('/contacts').get(function(req, res){
    Contact.find(function(err, contacts){
        if (err) {
            console.log(err);
        } else {
            res.json(contacts);
        }
    });
});

// Endpoint 2 - Show a single Contact:
appliRoutes.route('/contacts/:id').get(function(req, res){
    let id = req.params.id;
    Contact.findById(id, function(err, contact){
        res.json(contact);
    });
});

// Endpoint 3 - Add New Contact:
appliRoutes.route('/contacts/add').post(function(req, res){
    let contact = new Contact(req.body);
    contact.save()
        .then(contact => {
            res.status(200).json({'Contact': 'contact added successully'});
        })
        .catch(err => {
            res.status(400).send('Adding new contact failed')
        });

})




// Insert a router which is attached to a url pass (first param), router (second param)
// all the routes that are configured to the jobapp router, are relative to our base routes /jobapps
app.use('/appli-job-app-tracker', appliRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

