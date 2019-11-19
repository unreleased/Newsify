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
    try {
        // get article and remove news source.
        let article = `${req.body.article.title} - ${req.body.article.content}`.split(' - ')
            article = article.splice(0, article.length - 1).join(' - ')
    
        if (!article) {
            return res.status(400).json({
                success: false,
                message: 'Missing article information.'
            })
        }


        // get entities
        const entities = await Razortext.getEntities(article)

        if (!entities) {
            return res.status(400).json({
                success: false,
                message: 'Failed to find any valid entities.'
            })
        }

        // get access token
        if (req.session.data && req.session.data.access_token) {
            const token = req.session.data.access_token
            const songs = await Spotify.getSongList(entities, token)
            return res.status(200).json({
                success : true,
                songs   : songs
            })
        } else {
            return res.status(401).json({
                success : false,
                message : 'Unauthorized. Please login.'
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
