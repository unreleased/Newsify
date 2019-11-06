const request = require('request-promise')



const test = async () => {
    const opts = {
        url: 'https://newsapi.org/v2/everything?q=bitcoin&from=2019-10-30&sortBy=publishedAt&apiKey=bce90940085b4fa18ece26f8b2bb06c9',
        method: 'GET',
        json: true,
        simple: false,
        resolveWithFullResponse: true
    }

    

    return request(opts).then(res => {
        console.log(res.body.articles[0])
        console.log(res.body.articles[0].source)
        console.log(res.statusCode)
    }).catch(err => {
        console.log(err)
    })
}

test()