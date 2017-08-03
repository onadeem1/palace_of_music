const router = module.exports = require('express').Router()
const Promise = require('bluebird')
const request = Promise.promisify(require('request'));

Promise.promisifyAll(request);

var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

router.use('/:name', (req, res, next) => {
  const artist = req.params.name;

  request.post(authOptions, (error, response, body) => {

    if (!error && response.statusCode === 200) {
      const token = body.access_token; // use the access token to access the spotify web API
      const options = {
        url: `https://api.spotify.com/v1/search?q=${artist}&type=artist`,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        json: true
      };

      request.getAsync(options)
      .then((response) => {
        const artistData = response.body.artists.items[0];
        res.send(artistData);
      })
      .catch(next)
    }

  })
});
