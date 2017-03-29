const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const chalk = require('chalk')
const db = require('./models')
const Composer = require('./models/composer-model')
const User = require('./models/user-model')


module.exports = app

app.set('port', (process.env.PORT || 3000))

/* initiate middleware */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

  // serve static assets normally
app.use(express.static(path.resolve(__dirname, '..', 'client')));
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


app.listen(app.get('port'), () => {
  console.log('listening on *:', app.get('port'));
  db.sync()
  .then(function(){
    console.log('database is synced!')
  })
})
