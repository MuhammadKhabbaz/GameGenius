
const apiKey = '?key=3cdf9cc32da5448dbb6bfe6c7afa0561';
var gameID;
var ratingEl = $('#containerRatingCardPage')

function getGameDetails() {
    
    var url = 'https://api.rawg.io/api/games/' + gameID + apiKey;
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        // Do something/ call a function
        .then(function (data) {
            console.log(data);
            $('#gameImg').attr('src', data.background_image);
            $('#gameTitle').text(data.name);
            $('#gameDesc').text(data.description_raw);
            ratingEl.append(getRating(data.rating_top))
        })
    // return genreList;
}


function getRating(num) {
    console.log(num);
    var divRating = $('<p>')

    for (var i = 1; i <= 5; i++) {
        var rating = $('<i>');
        if (num >= i) {
            // create full star
            rating.addClass('fa-solid fa-star');
        } else {
            // create empty star
            rating.addClass('fa-regular fa-star');
        }

        divRating.append(rating);
    }
    divRating.append(' Rating');
    return divRating;
}



function init(){
    gameID = JSON.parse(localStorage.getItem("gameID"));
    console.log(gameID);
    getGameDetails();
}

init()