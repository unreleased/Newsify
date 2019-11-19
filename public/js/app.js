$(document).ready(function() {
    $(".getSongs").click(function() {
        const parent  = $(this).parent()
        const article = {
            title   : parent.find("h3").text(),
            content : parent.find("p").text()
        }

        $.ajax({
            url: '/api/search',
            method: 'POST',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: {
                article: article
            },
            success: function(resp) {
                console.log(resp)
            }
        })
    })
})