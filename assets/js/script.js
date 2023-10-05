var searchButtonEl = $('#buttonSearch');
var gamelistEl = $('#gameLists');
var gameCards = $('#gameCards');

var prevBtnEl = $('#prevBtn');
var nextBtnEl = $('#nextBtn');
var gameCardsResultEl = $("#gameCardsResult");
var sortByContainerEl = $("#sortByContainer");

var prev;
var next;

// RAWG API key
const apiKey = '?key=3cdf9cc32da5448dbb6bfe6c7afa0561';
const rawgUrl = 'https://api.rawg.io/api/games';

// RAWG API function call for searchfiterG
// args: endpoint as input
function rawgGames(url) {
    // Hide news section of page
    console.log(url);
    $('#newsSection').css('display', 'none');
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // Call function to generate game lists based on data resulst
            generateGameList(data.results);
            // Display prev and next buttons
            prevBtnEl.css('display', 'inline');
            nextBtnEl.css('display', 'inline');
            prev = data.previous
            next = data.next
            localStorage.setItem('prev', JSON.stringify(prev));
            localStorage.setItem('next', JSON.stringify(next));
            // Check if prev and next is null or not
            if (prev === null){
                prevBtnEl.css('display', 'none');
            } else if (next === null){
                nextBtnEl.css('display', 'none');
            } 
        })
}


// When search button is clicked add paremeters to endpoint and call api
function handleSearchButton(){
    gamelistEl.empty();
    console.log('SEARCH PRESSED');
    var searchInputEl = search();
    // searchInputEl += filterGenres();
    searchInputEl += filterNoPlayers();
    searchInputEl += filterPlatforms();
    rawgGames(rawgUrl+apiKey+searchInputEl);
}

// Search button event
searchButtonEl.on('click', handleSearchButton);
// Pressing enter key
$('#searchInput').keypress(function (e) {
    var key = e.which;
    if(key == 13)  // the enter key code
     {
        searchButtonEl.click();
       return false;  
     }
});  


// TODO: Need add a function for filter parameters and add it to search or call another api
function search(){
    var searchParam = '&search=';
    var searchmade = $('#searchInput');
    searchParam += searchmade.val().trim();
    return searchParam;
}
function filterGenres(){
    var genreParam = '&genres=';
    // Get from genres tags inputs and append to genreParam var
    var genreselected = $("#genreSelector")
    genreParam += genreselected.val()
    return genreParam;
}
function filterPlatforms(){
    var platformParam = '&parent_platforms=';
    var platformSelected = $("#platformSelector")
    platformParam += platformSelected.val()
    return platformParam;
}
function filterNoPlayers(){
    var playersParam = '&tags='
    var playersSelected = $("#playersSelector")
    playersParam += playersSelected.val()
    return playersParam;
}



function generateGameList(searchResults){
    for (var i = 0; i < searchResults.length; i++){
        // console.log(searchResults[i].name);

        // TODO need to add class name for css game cards
        var gameListItemEl = $('<li class="box">');
        var gameImgEL = $('<img>').attr('src', searchResults[i].background_image);
        // sample might be removed
        gameImgEL.css({'width' : '10%' , 'height' : '10%'});
        var gameNameEl = $('<a>').text(searchResults[i].name).attr('href',"gamePage.html");
        gameNameEl.css('display', 'block');
        var gameTextCard=$('<p>').text('Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate reprehenderit quam distinctio hic ea eveniet voluptatum cum culpa? Veniam temporibus cum excepturi et ullam nostrum quos qui delectus culpa. Vero!')
        gameTextCard.css('display', 'inline')
        gameListItemEl.append(gameNameEl, gameImgEL, gameTextCard);
        gamelistEl.append(gameListItemEl);
    }
}


// Initial Pagination functions
// When next button is clicked move next results
nextBtnEl.on('click', function () {
    console.log('NEXT BUTTON_--------------')
    console.log(next);
    gamelistEl.empty();
    rawgGames(next);
});

// When prev button is clicked move prev results
prevBtnEl.on('click', function () {
    console.log('PREV BUTTON_--------------')
    console.log(prev);
    gamelistEl.empty();
    rawgGames(prev);
});


//*************************** SOME OTHER CATEGORIES WE MIGHT NEED ***************************

// List of genres available for RAWG API
// returns an array of genres, we can add to genre filter
// function getGenres(){
//     var genreList = [];
//     var url = 'https://api.rawg.io/api/genres' + apiKey;
//     fetch(url)
//         .then(function (response) {
//             return response.json();
//         })
//         // Do something/ call a function
//         .then(function (data) {
//             console.log(data);
//             for (var i =0; i<data.results.length; i++) {
//                 genreList.push(data.results[i].slug);
//             }
//             console.log(genreList);
//         })
//     return genreList;
// }


// ADD something here for autocomplete filters.





// List of Platforms available for RAWG API
function getPlatforms(){
    var platformList = []
    var url = 'https://api.rawg.io/api/platforms/lists/parents' + apiKey;
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        // Do something/ call a function
        .then(function (data) {
            console.log(data);
            for (var i =0; i<data.results.length; i++) {
                platformList.push(data.results[i].slug);
            }
            console.log(platformList);
        })
    return platformList;
        }

// function getMaturityRating(){
//     var maturityList = []
//     var url = 'https://api.rawg.io/api/games/{id}' + apiKey;
//     fetch(url)
//         .then(function (response) {
//             return response.json();
//         })
//         // Do something/ call a function
//         .then(function (data) {
//             console.log(data);
//             for (var i =0; i<data.results.length; i++) {
//                 maturityList.push(data.results[i].slug);
//             }
//             console.log("ml="+maturityList);
//         })
//     return maturityList;
// }

function getNOofPlayers(){
    var NoPlayers = []
    var url = 'https://api.rawg.io/api/tags' + apiKey;
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        // Do something/ call a function
        .then(function (data) {
            console.log(data);
            for (var i =0; i<data.results.length; i++) {
                NoPlayers.push(data.results[i].slug);
            }
            console.log( NoPlayers);
        })
    return NoPlayers;
}
// Returns to landing page
$('#gameGeniusTitle').on('click', function () {
    window.location.reload();
})

// Initialize page
function init(){
    // Hide pagination buttons on landing page
    prevBtnEl.css('display', 'none');
    nextBtnEl.css('display', 'none');
    gameCardsResultEl.css('display', 'none');
    sortByContainerEl.css('display', 'none');
    localStorage.setItem('prev', JSON.stringify(null));
    localStorage.setItem('next', JSON.stringify(null));

    // getGenres();
    getPlatforms();
    getNOofPlayers();

}
init();