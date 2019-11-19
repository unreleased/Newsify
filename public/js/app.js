$(document).ready(function() {
    $(".getSongs").click(function() {
        const parent  = $(this).parent()
        const article = {
            title   : parent.find("h3").text(),
            content : parent.find("p").text()
        }

        const opts = {
            url: '/api/search',
            method: 'POST',
            data: {
                article: article
            }
        }

        axios(opts).then(res => {
            if (res.status == 200) {
                const songs = res.data.songs
                for (let i = 0; i < songs.length; i++) {
                    parent.find(".songs").append(`<div class="song">${songs[i].name} (${songs[i].artists}) - <a target="_new" href="${songs[i].url}">Play Song</a></div>`)
                }
            } else {
                parent.find("h3").after(`<div class='error'>Failed to get songs.</div>`)
            }
        }).catch(err => {
            parent.find("h3").after(`<div class='error'>Failed to get songs!</div>`)
        })

        return false

    })
})