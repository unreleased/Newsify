const dotenv  = require('dotenv').config()
const request = require('request-promise').defaults({
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

module.exports = Spotify