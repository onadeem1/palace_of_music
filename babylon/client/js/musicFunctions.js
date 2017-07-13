import axios from 'axios'
import $ from 'jquery'

const fetchTracks = (albumId) => {
  return axios.get('https://api.spotify.com/v1/albums/' + albumId)
}

export const searchAlbumsAndPlaySong = (query) => {
  axios.get('https://api.spotify.com/v1/search', {
    params: {
      q: query,
      type: 'artist'
    }
  })
    .then(res   => fetchTracks(res.data.albums.items[Math.floor(Math.random() * res.data.albums.items.length)].id))
    .then(album => album.data.tracks.items)
    .then(songs => new Audio(songs[Math.floor(Math.random() * songs.length)].preview_url))
    .then(audio => audio.play())
}

//database request
export const getComposer = meshHit => axios.get(`/${meshHit}`)

//spotify code
let spotifyURL = '<iframe src="https://embed.spotify.com/?uri='
let spotifyOptions = ' width="500" height="350" frameborder="0" allowtransparency="true"></iframe>'

const getArtistURI = (name) => {
  return axios.get(`/spotify/${name}`)
  .then(artist => artist.data.uri)
}

const appendSpotify = (id, uri) => {
  let fullUrl = spotifyURL + uri + '"' + spotifyOptions
  $(id).append(fullUrl)
}

export const createArtistSpotify = (name, id) => {
  getArtistURI(name)
  .then(uri => appendSpotify(id, uri))
}
