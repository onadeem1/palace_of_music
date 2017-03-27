'use strict';

const express = require('express');
const router = new express.Router();
const Composer = require('../../babylon/server/models/composer-model');;
module.exports = router;

router.get('/:period', (req, res, next) => {
  Composer.findAll({
    where: {
      timeperiod: req.params.period}
  })
  .then(composers => {
    return res.json(composers)
  })
  .catch(next);
});
