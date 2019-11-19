const dotenv  = require('dotenv').config()
const request = require('request-promise').defaults({
    method: 'GET',
    json: true,
    simple: false,
    resolveWithFullResponse: true,
    headers: {
        'X-TextRazor-Key': 'cfb2af3ce968f9cbb4dbbcb84aa0879f9b7512506e99e7cfcc996bef'
    }
})


const Razortext = {}

Razortext.getEntities = async (query) => {
    const opts = {
        url: `https://api.textrazor.com`,
        form: {
            text: query,
            extractors: 'entities'
        }
    }

    return request(opts).then(res => {
        let data     = res.body.response
        let entities = []

        for (let i = 0; i < data.entities.length; i++) {
            const entity = data.entities[i]
            entities.push({
                text: entity.matchedText,
                revelance: entity.relevanceScore,
                confidence: entity.confidenceScore,
                score: (entity.relevanceScore * entity.confidenceScore)
            })
        }

        entities = entities.sort((a, b) => (a.score < b.score) ? 1 : -1)

        return entities
    }).catch(err => {
        console.log(err)
        return false
    })
}

module.exports = Razortext
