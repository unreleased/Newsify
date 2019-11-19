const dotenv    = require('dotenv').config()
const Razortext = require('../models/Razortext')
const request   = require('request-promise').defaults({
    method: 'GET',
    json: true,
    simple: false,
    resolveWithFullResponse: true
})


const Spotify = {}


Spotify.exchangeCode = async (code) => {
    const opts = {
        url: 'https://accounts.spotify.com/api/token',
        method: 'POST',
        header: {
            'Content-type': 'application/x-www-form-urlencoded',
        },
        form: {
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: process.env.SPOTIFY_REDIRECT,
            client_id: process.env.SPOTIFY_CLIENT_ID,
            client_secret: process.env.SPOTIFY_CLIENT_SECRET
        }
    }


    return request(opts).then(res => {
        if (res.statusCode == 200) {
            res.body.succes = true
            return res.body
        } else {
            return false
        }
    }).catch(err => {
        console.log(err)
        return false
    })
}

Spotify.me = async (refresh) => {
    const opts = {
        url: 'https://api.spotify.com/v1/me',
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${refresh}`
        }
    }

    return request(opts).then(res => {
        if (res.statusCode == 200) {
            return res.body
        } else {
            return false
        }
    }).catch(err => {
        console.log(err)
        return false
    })
}

Spotify.getSongs = async (query, token) => {
    const opts = {
        url: `https://api.spotify.com/v1/search?q=${query}&type=track`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    return request(opts).then(res => {
        const tracks = []
        for (let i = 0; i < 5; i++) {
            const track = res.body.tracks.items[i]
            tracks.push(track)
        }

        return tracks
    }).catch(err => {
        console.log(err)
        return false
    })
}

Spotify.getSongList = async (entities, token) => {
    const songs = []

    for (let i = 0; i < entities.length; i++) {
        const resp = await Spotify.getSongs(entities[i].text, token)

        responses: for (let x = 0; x < resp.length; x++) {
            if (songs.length < 5) {
                for (let j = 0; j < songs.length; j++) {
                    if (songs[j].name == resp[x].name) {
                        continue responses;
                    }
                }

                songs.push({
                    name     : resp[x].name,
                    url      : resp[x].external_urls.spotify,
                    explicit : resp[x].explicit,
                    artists  : resp[x].artists.map(artist => artist.name).join(', ')
                })
            } else {
                break;
            }
        }
    }

    return songs;
}

Spotify.createPlaylist = async () => {

}

Spotify.addSongToPlaylist = async () => {

}


module.exports = Spotify