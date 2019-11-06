// 

const request = require('request-promise')

const test = async (query) => {
    const opts = {
        url: `https://api.spotify.com/v1/search?q=${query}&type=track`,
        method: 'GET',
        headers: {
            'Authorization': `Bearer BQB8m8mRwj361CNCxRuF9jFBz7L7qEZXCQxGcC2JuIiSXIiU6Rh7fR8PNieaEcctutiklFJfuXqgZDWyGbA5i8ainJUiOeAdZjN_vRk6dbQHg70YO-NpqUvPLAPd9j_aVNmRgbXmIge9o766lMDlekWU6mvrow`
        },
        json: true,
        simple: false,
        resolveWithFullResponse: true
    }

    return request(opts).then(res => {
        for (let i = 0; i < 5; i++) {
            const track = res.body.tracks.items[i]
            console.log(track)
        }

        console.log(res.statusCode)
    }).catch(err => {
        console.log(err)
    })
}

test('tiny+dancer')