const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const db = require('../../babylon/server/models');

app.use('/period', require('./composers.js'));

/* initiate middleware */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
  // serve static assets normally
app.use(express.static(path.resolve(__dirname, '..', 'client')));

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, '..', 'client', 'index.html'))
})

app.listen(3001, () => {
  console.log('listening on *:3001');
  db.sync()
  .then(function(){
    console.log('database is synced!')
  })
})
