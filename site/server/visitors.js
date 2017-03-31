'use strict';

const express = require('express');
const router = new express.Router();
const Visitor = require('../../babylon/server/models/visitor-model');
module.exports = router;

router.get('/members', (req, res, next) => {
  Visitor.findAll()
  .then(allVisitors => {
    res.json(allVisitors)
  })
  .catch(next);
})

router.post('/members/:first/:last', (req, res, next) => {
  const date = new Date();
  Visitor.findOrCreate({
    where: {
      first: req.params.first,
      last: req.params.last
    },
    defaults: {
      date: date
    }
  })
  .spread((visitor, wasCreated) => {
    if (!wasCreated) {
      const newDate = new Date();
      visitor.update({
        date: newDate
      })
    }
  })
  .catch(next);
});
