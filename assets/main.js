init();
$("#result").children().children().append(createBTn(-1));

$("#searchBtn").on("click", function(){
    getMusic();
    result();
});

$("#result").on("clicki","#backBtn",function(){
    init();
    $("#inputGroup").select().val("0");
    $("#userInput").val("");
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
    var input = $("#userInput").val();
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

function bioSearch(input){
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

function createBTn(i){
    if(i < 0){
        var btn = $("<button>").attr({
            "class":"card-text btn btn-secondary text-center",
            "id": "backBtn"
        }).text("Back");
    }else if(i >= 0){
        var btn = $("<button>").attr({
            "class":"card-text btn btn-secondary",
            "id": "detailsBtn"+i
        }).text("Details");
    }
    return btn;
}

function displayResultLyrics(response){
    if(response.status === "success"){
        console.log("success");
        var songCollection = response.result;
        songCollection.forEach(function(element, i){
            var card = $("<div>").addClass("col-6 card mb-2");
            var cardBody = $("<div>").addClass("card-body");
            var title = $("<h5>").addClass("card-title").text(i+" "+element.full_title);
            var artist = $("<p>").addClass("card-text").text(element.artist);            
            var lyrics = $("<div>").addClass("card-text");
            var lyricsLine = element.lyrics.split("\n");
            lyricsLine.forEach(function(el, index){
                var lyricEl = $("<p>").text(el);
                lyrics.append(lyricEl);
            });            
            cardBody.append(title,artist,lyrics, createBTn(i));
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
        var artist = $("<h5>").addClass("card-title").text(result.strArtist);
        var year = $("<p>").addClass("card-text").text(result.intFormedYear);
        var bio = $("<p>").addClass("card-text").text(result.strBiographyEN);
        cardBody.append(artist,year,bio,createBTn(1));
        card.append(cardBody);
        $("#result").append(card);  
    }
}

function displayResultSong(response){

}

function alertMsg(){
    console.log("error");
}