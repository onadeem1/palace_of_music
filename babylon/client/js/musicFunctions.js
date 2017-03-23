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
  .then(res => console.log(res.data))
    // .then(res   => fetchTracks(res.data.albums.items[Math.floor(Math.random() * res.data.albums.items.length)].id))
    // .then(album => album.data.tracks.items)
    // .then(songs => new Audio(songs[Math.floor(Math.random() * songs.length)].preview_url))
    // .then(audio => audio.play())
}

export const getComposer = (meshHit) => {
  return axios.get('/' + meshHit)
}

const getArtistURI = (name) => {
  return axios.get('https://api.spotify.com/v1/search', {
    params: {
      q: name,
      type: 'artist'
    }
  })
  .then(res => {return res.data.artists.items[0]})
  .then(artist => {return artist.uri})
}

let spotifyURL = '<iframe src="https://embed.spotify.com/?uri='
let spotifyOptions = ' width="490" height="300" frameborder="0" allowtransparency="true"></iframe>'

export const appendSpotify = (id, uri) => {
  let fullUrl = spotifyURL + uri + '"' + spotifyOptions
  console.log('FULL URL', fullUrl)
  $(id).append(fullUrl)
}

export const createArtistSpotify = (name, id) => {
  return getArtistURI(name)
  .then(uri => {console.log('what is URI', uri); appendSpotify('#textDialog', uri)})
}

// $("#textDialog").append('<iframe src="https://embed.spotify.com/?uri=spotify:artist:2wOqMjp9TyABvtHdOSOTUS" width="490" height="300" frameborder="0" allowtransparency="true"></iframe>')

//sample uri "spotify:artist:2wOqMjp9TyABvtHdOSOTUS"

// '<iframe src="https://embed.spotify.com/?uri=spotify:artist:2wOqMjp9TyABvtHdOSOTUS width="490" height="300" frameborder="0" allowtransparency="true"></iframe>'

// '<iframe src="https://embed.spotify.com/?uri=spotify:artist:2wOqMjp9TyABvtHdOSOTUS" width="490" height="300" frameborder="0" allowtransparency="true"></iframe>'
