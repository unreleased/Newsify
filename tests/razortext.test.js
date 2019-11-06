const request = require('request-promise')

const test = async (query) => {
    const opts = {
        url: `https://api.textrazor.com`,
        method: 'GET',
        headers: {
            'X-TextRazor-Key': 'cfb2af3ce968f9cbb4dbbcb84aa0879f9b7512506e99e7cfcc996bef'
        },
        form: {
            text: query,
            extractors: 'entities'
        },
        json: true,
        simple: false,
        resolveWithFullResponse: true
    }

    return request(opts).then(res => {
        const data     = res.body.response
        const entities = []

        for (let i = 0; i < data.entities.length; i++) {
            const entity = data.entities[i]
            entities.push({
                text: entity.matchedText,
                revelance: entity.relevanceScore,
                confidence: entity.confidenceScore
            })
        }

        console.log(entities)

        // console.log(res.body)
        console.log(res.statusCode)
    }).catch(err => {
        console.log(err)
    })
}

test('Bitcoin Transactions Brought in $500k in Fees Within 24 Hours - Bitcoin transactions have been exploding recently, and the network managed to collect over half a million in fees within only 24 hours.\r\nThe last several days have been pretty happening for bitcoin. This time, the benchmark cryptocurrency did not see a massiv…')