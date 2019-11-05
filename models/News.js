const dotenv  = require('dotenv').config()
const request = require('request-promise').defaults({
    json: true,
    simple: false,
    resolveWithFullResponse: true,
    json: true,
})



const News = {}


News.getHeadlines = async (country) => {
    const opts = {
        url: `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${process.env.NEWSIFY_API_KEY}`,
        method: 'GET',
    }

    return request(opts).then(res => {
        return res.body
    }).catch(err => {
        console.log(err)
        return false
    })
}

module.exports = News