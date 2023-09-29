var searchButtonEl = $('#buttonSearch');
var gamelistEl = $('#gameLists');

// RAWG API key
const apiKey = '3cdf9cc32da5448dbb6bfe6c7afa0561';

// RAWG API function call for search
// args: query for search input
function rawgGames(query) {
    var url = 'https://api.rawg.io/api/games?key=' + apiKey + '&search=' + query;
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data.results);
            var searchResults = data.results;
            for (var i = 0; i < searchResults.length; i++){
                console.log(searchResults[i].name);
                generateGameList(searchResults[i]);
            }
        })
}

function generateGameList(results){
    var gameListItemEl = $('<li class="">');
    var gameImgEL = $('<img>').attr('src', results.background_image);
    gameImgEL.css({'width' : '10%' , 'height' : '10%'});
    var gameNameEl = $('<h3>').text(results.name);
    gameListItemEl.append(gameNameEl, gameImgEL);
    gamelistEl.append(gameListItemEl);
}

// List of genres available for RAWG API
function getGenres(){
    var url = 'https://api.rawg.io/api/genres?key=' + apiKey;
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        // Do something/ call a function
        .then(function (data) {
            console.log(data);
        })
}
// getGenres();

// List of Platforms available for RAWG API
function getPlatforms(){
    var url = 'https://api.rawg.io/api/platforms?key=' + apiKey;
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        // Do something/ call a function
        .then(function (data) {
            console.log(data);
            console.log(data);
        })
}
// getPlatforms();



function handleFormSubmit(){
    var searchInputEl = $('#searchInput').val();
    rawgGames(searchInputEl.trim());
    $('#newsSection').css('display', 'none');
    //populate stuff

}

// Search button event
searchButtonEl.on('click', handleFormSubmit);
