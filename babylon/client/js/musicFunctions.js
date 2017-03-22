import axios from 'axios'

const fetchTracks = (albumId) => {
  return axios.get('https://api.spotify.com/v1/albums/' + albumId)
}

export const searchAlbumsAndPlaySong = (query) => {
  axios.get('https://api.spotify.com/v1/search', {
    params: {
      q: query,
      type: 'album'
    }
  })
    .then(res => fetchTracks(res.data.albums.items[0].id))
    .then(album => album.data.tracks.items)
    .then(songs => new Audio(songs[0].preview_url))
    .then(audio => audio.play())
}
