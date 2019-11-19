const express = require('express');
const router  = express.Router();
const dotenv  = require('dotenv').config()
const Spotify = require('../models/Spotify')
const News    = require('../models/News')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('spotify', { title: 'Spotify' });
});

router.get('/login', function(req, res, next) {
    const scopes = 'user-read-private user-read-email'
    const url    = encodeURI(`https://accounts.spotify.com/authorize?client_id=${process.env.SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.SPOTIFY_REDIRECT}&scope=${scopes}&state=`)
    return res.redirect(url)
});

router.get('/dashboard', async function(req, res, next) {
    if (req.session.data) {
        const user = await Spotify.me(req.session.data.access_token)
        const news = await News.getHeadlines(user.country)
        return res.render('dashboard', {
            user: user,
            articles: news.articles
        });
    } else {
        return res.redirect('/spotify')
    }
});

router.get('/callback', async function(req, res, next) {
    const code = req.query.code
    req.session.data = await Spotify.exchangeCode(code)

    // Set their spotify data to their session
    if (req.session.data) {
        return res.redirect('/spotify/dashboard')
    } else {
        return res.render('error-view')
    }
});

router.get('/logout', async function(req, res, next) {
    req.session.data = false
    return res.redirect('/spotify')
});

module.exports = router;
