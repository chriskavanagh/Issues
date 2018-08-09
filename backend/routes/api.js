const express = require('express');
// import express from 'express';
const router = express.Router();
const Issue = require('../models/issue');
const bodyParser = require('body-parser');

// body-parser middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

// simple logger for this router's requests
// all requests to this router will first hit this middleware
router.use(function(req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});

// get all issues
router.get('/', (req, res) => {
	Issue.find((err, issues) => {
    if (err) {
      console.log(err);
   }else{
      res.json(issues);
    }
  });
});

// add/create issue
router.post('issues/add', (req, res) => {
    Issue.create(req.body, (err, issue) => {
        if (err) {
            res.status(400).send('Failed to create new record');
       }else{
        res.status(200).json({'issue': 'Added successfully', 'Issue':issue});
        }
    });
});

// find issue by id
router.get('/issues/:id', (req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if (err) {
            console.log(err);
       }else{
            res.json(issue);
        }
    });
});

// update issue by id
router.post('/issues/update/:id',(req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if (!issue)
            return next(new Error('Could not load document'));
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
router.get('/issues/delete/:id', (req, res) => {
    Issue.findByIdAndRemove({_id: req.params.id}, (err, issue) => {
        if (err)
            res.json(err);
        else
            res.json('Remove successfully');
    });
});


// export router
module.exports = router;