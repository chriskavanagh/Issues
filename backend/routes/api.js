// import express from 'express';
const express = require('express');
const router = express.Router();
const Issue = require('../models/issue');
const bodyParser = require('body-parser');

// body-parser middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

// useless middleware for test
/* var myLogger = function (req, res, next) {
    console.log('LOGGED');
    next();
    };
    
router.use(myLogger); */

// get all issues
router.get('/', (req, res, next) => {
	Issue.find((err, issues) => {
    // if (err) throw err;
    if (!issues) {
        res.status(404).send("Issue Not Found!");
   }else{
      res.json(issues);
    }
  });
});

// add/create issue
router.post('/issues/add', (req, res, next) => {
    Issue.create(req.body, (err, issue) => {
        // if (err) throw err;
        if (!issue) {
            res.status(400).send('Failed to create new record');
       }else{
            res.status(200).json({'issue': 'Added successfully', 'Issue':issue});
        }
    });
});

// find issue by id
router.get('/issues/:id', (req, res, next) => {
    Issue.findById(req.params.id, (err, issue) => {
        // if (err) throw err;
        if (!issue) {            
            res.status(404).send("Issue Not Found!");            
       }else{
            res.json(issue);
        }
    });
});

// update issue by id
router.post('/issues/update/:id',(req, res, next) => {
    // if (err) throw err;
    Issue.findById(req.params.id, (err, issue) => {
        if (!issue)
            res.status(404).send("Issue Not Found!");
        else {
            issue.title = req.body.title;
            issue.responsible = req.body.responsible;
            issue.description = req.body.description;
            issue.severity = req.body.severity;
            issue.status = req.body.status;

            issue.save().then(issue => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

// delete issue by id
router.get('/issues/delete/:id', (req, res, next) => {
    // if (err) throw err;
    Issue.findByIdAndRemove({_id: req.params.id}, (err, issue) => {
        if (!issue)
            res.status(404).send("Issue Not Found!");
        else
            res.json('Remove successfully');
    });
});



// export router
module.exports = router;