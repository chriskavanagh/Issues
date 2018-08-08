// const express = require('express');
import express from 'express';
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

router.post('/add', (req, res) => {
    Issue.create(req.body, (err, issue) => {
        if (err) {
            res.status(400).send('Failed to create new record');
       }else{
        res.status(200).json({'issue': 'Added successfully', 'Issue':issue});
        }
    });
});



// export router
module.exports = router;