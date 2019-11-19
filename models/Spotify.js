const dotenv  = require('dotenv').config()
const request = require('request-promise').defaults({
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

Spotify.getSongs = async (query) => {
    const opts = {
        url: `https://api.spotify.com/v1/search?q=${query}&type=track`,
        headers: {
            'Authorization': `Bearer BQApl2cDfZ49IbadEJkuRDmmg1fkgU-RF-swMOsgYngX9m3xdQ8rPZiT0aPMvPvYRXqhOW6yEW1VP-uf6b5wf9y3StqMOentPxPHNO18DvOrsVuZYQJ_2uXI5RrWjRqWkDi0cpRWVl6nv3xC0AswapbDVFc`
        }
    }

    return request(opts).then(res => {
        const tracks = []
        for (let i = 0; i < 5; i++) {
            const track = res.body.tracks.items[i]
            console.log(track)
            tracks.push(track)
        }

        return tracks
    }).catch(err => {
        console.log(err)
        return false
    })
}

module.exports = Spotify