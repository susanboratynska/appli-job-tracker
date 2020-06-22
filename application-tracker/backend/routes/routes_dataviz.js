const express = require('express');
const appliRoutes = express.Router();
let Jobapp = require('../models/jobapp.model');



// Endpoint 1 - Get all calendar data:
appliRoutes.route('/calendarviz').get(function(req, res){
    Jobapp.aggregate([
        {
            $group : {_id : {$dateToString: {format: "%G-%m-%d",date: "$jobapp_applydate"}}, count: { $sum: 1 }}
        },
        {
            $project: {
                _id: 0,
                day: "$_id",
                'value': '$count'
            }
        }

    ],function(err, calData){
        if (err) {
            console.log(err);
        } else {
            res.json(calData);
        }
    });
});



module.exports = appliRoutes;