const express = require('express');
const router  = express.Router();

const Razortext = require('../models/Razortext')
const Spotify   = require('../models/Spotify')

router.get('/songs/:query', async (req, res, next) => {
    try {
        const query = req.params.query
        const songs = await Spotify.getSongs(query)
        return res.status(200).json({
            success: true,
            songs  : songs
        })
    } catch(err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'There was an error trying to get the entities for this article.'
        })
    }
});

router.post('/search', async (req, res, next) => {
    console.log(req.body)
    
    try {
        const article = `${req.body.article.title} - ${req.body.article.content}`
    
        if (article) {
            const entities = await Razortext.getEntities(article)
    
            return res.status(200).json({
                success : true,
                entities: entities
            })
        } else {
            return res.status(400).json({
                success: false,
                message: 'Missing article information.'
            })
        }
    } catch(err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'There was an error trying to get the entities for this article.'
        })
    }
})


module.exports = router;
