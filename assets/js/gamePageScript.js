const rawgapiKey = '?key=3cdf9cc32da5448dbb6bfe6c7afa0561';
const youtubeapikey = '&key=AIzaSyAN_9Bq4hnrTpetCxnk0WxzCbZw3SnJQeQ';
var gameID;
var ratingEl = $('#containerRatingCardPage');
var linkVideo = $("#linkVideo");

function getGameDetails() {
    var url = 'https://api.rawg.io/api/games/' + gameID + rawgapiKey;
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            $('#gameImg').attr('src', data.background_image);
            $('#gameTitle').text(data.name);
            $('#gameDesc').text(data.description_raw);
            ratingEl.append(getRating(data.rating_top));
        })
}

function getRating(num) {
    console.log(num);
    var divRating = $('<p>');

    for (var i = 1; i <= 5; i++) {
        var rating = $('<i>');
        if (num >= i) {
            rating.addClass('fa-solid fa-star');
        } else {
            rating.addClass('fa-regular fa-star');
        }
        divRating.append(rating);
    }
    divRating.append(' Rating');
    return divRating;
}

function youtubeSearch() {
    var url = 'https://api.rawg.io/api/games/' + gameID + youtubeapiKey;
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var firstResult = data.items[0];
            if (firstResult) {
                var videoId = firstResult.id.videoId;
                var videoUrl = 'https://www.youtube.com/watch?v=' + videoId + youtubeapikey;
                document.getElementById("linkVideo").href = videoUrl;
            }
        })
        .catch(function(error) {
            console.log('Error:', error);
        });
}

linkVideo.on('click', youtubeSearch);

function init() {
    gameID = JSON.parse(localStorage.getItem("gameID"));
    console.log(gameID);
    getGameDetails();
}

init();