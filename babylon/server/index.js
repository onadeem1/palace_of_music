const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const chalk = require('chalk')
const db = require('./models')
const Composer = require('./models/composer-model')
const User = require('./models/user-model')


module.exports = app

/* initiate middleware */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// serve static assets normally
app.use(express.static(path.resolve(__dirname, '..', 'client')));

// add headers
app.use((req, res, next) => {

    // website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

    // request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Authorization');

    next();
});

// spotify router
app.use('/spotify', require('./routes/spotify.js'));

// error handling
app.use((err, req, res, next) =>
  res.status(err.status || 500).send(err.message || 'Internal server error.'));

app.get('/:meshName', (req, res, next) => {
  Composer.findOne({
    where: {
      meshName: req.params.meshName
    }
  })
  .then(composer => res.json(composer))
  .catch(next)
})


// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, '..', 'client', 'index.html'))
})


app.listen(3000, () => {
  console.log('listening on *:3000');
  db.sync()
  .then(function(){
    console.log('database is synced!')
  })
})
