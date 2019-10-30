const request = require('request-promise')

const test = async () => {
    const opts = {
        url: 'https://api.spotify.com/v1/me',
        method: 'GET',
        headers: {
            'Authorization': 'Bearer BQBl929H-4pLEbVZywJRtRzZvgieICWHmsoK_X1dJbmD1wvOpfoM2Gi9QyhJdFTHHNW7RAQS9lhyHBMCtCJtowDYqH4-G7I_agr3Y0REn_dhqkMhSXhbtkN8q4xPvtuJvl4wJfI5uoodGrjzQAduEM4qZbg77w'
        },
        json: true,
        simple: false,
        resolveWithFullResponse: true
    }

    return request(opts).then(res => {
        console.log(res.body)
        console.log(res.statusCode)
    }).catch(err => {
        console.log(err)
    })
}

test()