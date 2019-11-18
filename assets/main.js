init();

$("#searchBtn").on("click", function(){
    getMusic();
    result();
});

//this is where all the functions are put
function init(){
    $("#indexPage").css("display", "block");
    $("#resultPage").css("display", "none");
    $("#detailsPage").css("display", "none");
}

function result(){
    $("#indexPage").css("display", "none");
    $("#resultPage").css("display", "block");
    $("#detailsPage").css("display", "none");
}

function details(){
    $("#indexPage").css("display", "none");
    $("#resultPage").css("display", "none");
    $("#detailsPage").css("display", "block");
}

function getMusic(){
    var select = $("#inputGroup").select().val();
    var input = $("#userInput").val();;
    switch(select){
        case "0":
            break;
        case "1":
            lyricSearch(input);
            break;
        case "2":
            artistSearch(input);
            break;
        case "3":
            songSearch(input);
            break;
        case "4":
            bioSearch(input);
    }
    
}

function lyricSearch(input){
    var queryURL = "https://api.audd.io/findLyrics/?q="+input;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log("1.Lyric");
        console.log(response);
        displayResultLyrics(response);
    });
}

function artistSearch(input){
    var queryURL = "https://theaudiodb.com/api/v1/json/1/search.php?s="+input;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log("2.Artist");
        console.log(response);
        displayResultArtist(response);
    });
}

function songSearch(input){
    var queryURL = "https://api.audd.io/findLyrics/?q="+input;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log("3.Song");
        console.log(response);
        displayResultSong(response);
    });
}

function bioSearch(){
    var queryURL = "https://theaudiodb.com/api/v1/json/1/search.php?s="+input;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log("4.Bio");
        console.log(response);
        displayResultArtist(response);
    });
}

function displayResultLyrics(response){
    if(response.status === "success"){
        console.log("success");
        var songCollection = response.result;
        songCollection.forEach(function(element, i){
            var card = $("<div>").addClass("col-3 card mb-2");
            var cardBody = $("<div>").addClass("card-body");
            var title = $("<h5>").addClass("card-title").text(i+" "+element.full_title);
            var artist = $("<p>").addClass("card-text").text(element.artist);
            var lyrics = $("<p>").addClass("card-text").text(element.lyrics);
            cardBody.append(title,artist,lyrics);
            card.append(cardBody);
            $("#result").append(card);          
        })
    }else{
        alertMsg();
    }
}

function displayResultArtist(response){
    if(response.artists){
        var result = response.artists[0];
        var card = $("<div>").addClass("col-12 card mb-2");
        var cardBody = $("<div>").addClass("card-body");
        var title = $("<h5>").addClass("card-title").text(result.strArtist);
        var artist = $("<p>").addClass("card-text").text(result.intFormedYear);
        var lyrics = $("<p>").addClass("card-text").text(result.strBiographyEN);
        cardBody.append(title,artist,lyrics);
        card.append(cardBody);
        $("#result").append(card);  
    }
}

function displayResultSong(response){

}

function alertMsg(){
    console.log("error");
}