var auddAPIKey = "d5816eb0cda1bb2190e56d50e3158e61";//this is the apiKey for audd API, 300 requests within thwo weeks' time
var flag = 1;//this is the indicator of the title on more box
var titleLength = 3;//this is the lenght of the title
var input;//this is to store tht user input in this variable
var select;//this is to store the user select in this variable

init();
$("#result").children(".card").children().append(createBTn(0));
$("#details").children(".card").children().append(createBTn(0));

$("#searchBtn").on("click", function(){
    getMusic();
    result();
});

$("#result").on("click","#backBtn",function(){
    init();
    // $("#inputGroup").select().val("0");
    $("#userInput").val("");
    $("#resultDisplay").empty();
});

$("#details").on("click","#backBtn",function(){
    result();
    $("#detailsDisplay").empty();
});

$("#result").on("click","#moreBtn",function(){
    var flag = $(this).attr("flag");
    if(flag === "1"){
        $(this).parent(".card-body").children(".card-title").text($(this).parent(".card-body").children(".card-title").attr("show-value"));
        $(this).attr("flag",0);
    }else{
        $(this).parent(".card-body").children(".card-title").text($(this).parent(".card-body").children(".card-title").attr("hide-value"));
        $(this).attr("flag",1);
    }   
});

$("#result").on("click", "#detailsBtn", function(){
    details();
    switch(select){
        case "0":
            break;
        case  "1":
            var search = $(this).parent(".card-body").children(".card-title").text();
            displayDetailLyrics(search);
            break;
        case  "2":
            var search = $(this).parent(".card-body").children(".albumTitle").text();
            albumSearch(search);
            break;
        case  "3":
            break;
        case  "4":
            break;
    }
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
    select = $("#inputGroup").select().val();
    input = $("#userInput").val();
    switch(select){
        case "0":
            break;
        case "1":
            lyricSearch();
            break;
        case "2":
            artistSearch();
            break;
        case "3":
            songSearch();
            break;
        case "4":
            bioSearch();
    }   
}

// function getDetails(search){
//     // select = $("#inputGroup").select().val();
//     switch(select){
//         case "0":
//             break;
//         case  "1":
//             displayDetailLyrics(search);
//             break;
//         case  "2":
//             albumSearch(search);
//             break;
//         case  "3":
//             break;
//         case  "4":
//             break;
//     }
// }

function lyricSearch(){
    var queryURL = "https://api.audd.io/findLyrics/?q="+input+"&api_token="+auddAPIKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log("1.Lyric");
        console.log(response);
        console.log(JSON.parse(response.result[0].media)[0]);
        displayResultLyrics(response);
    });
}

function artistSearch(){
    var queryURL = "https://theaudiodb.com/api/v1/json/1/searchalbum.php?s="+input;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log("2.Artist");
        console.log(response);
        displayResultArtist(response);
    });
}

function songSearch(){
    var queryURL = "https://theaudiodb.com/api/v1/json/1/searchtrack.php?&t="+input;
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
        displayResultBio(response);
    });
}

function albumSearch(album){
    var queryURL = "https://theaudiodb.com/api/v1/json/1/searchalbum.php?s="+input+"&a="+album;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log("5.Album");
        console.log(response);
        displayDetailAlbum(response);
    });
}

function lyricDisplay(response){

}

function createBTn(i){
    if(i === 0){
        var btn = $("<button>").attr({
            "class":"card-text btn btn-secondary text-center",
            "id": "backBtn"
        }).text("Back");
    }else if(i === 1){
        var btn = $("<button>").attr({
            "class":"card-text btn btn-secondary",
            "id": "detailsBtn"
        }).text("Details");
    }else if(i === 2){
        var btn = $("<button>").attr({
            "class":"card-text btn btn-success text-right ml-2",
            "flag": 1,//flag is to show the stautus of the shwo/hide of the more box
            "id": "moreBtn"
        }).text("More");
    }
    return btn;
}

function moreForTitle(title,i){
    //get the length of the word in a title string
    var length = title.split(" ").length;
    if(length>titleLength+1){
        var btn = createBTn(2);
    }
    return btn;
}

function displayResultLyrics(response){
    if(response.status === "success"){
        console.log("success");
        var songCollection = response.result;
        songCollection.forEach(function(element, i){
            console.log(element.media);
            var card = $("<div>").attr({
                "class": "col-12 col-md-6 col-lg-4 card mb-2",
                "title-value": element.title,
                "artist-value": element.artist
            });
            var cardBody = $("<div>").addClass("card-body");
            var moreBtn = moreForTitle(element.title,i);
            var title = $("<h5>").attr({
                "class": "card-title text-center",
                "id": "title"+i,
                "hide-value": element.title.split(" ").slice(0, titleLength).join(" "),
                "show-value": element.title
            }).text(element.title.split(" ").slice(0,titleLength).join(" "));
            var artist = $("<p>").addClass("card-text text-center").text(element.artist);            
            // var lyrics = $("<div>").addClass("card-text");
            // var lyricsLine = element.lyrics.split("\n");
            // lyricsLine.forEach(function(el){
            //     var lyricEl = $("<p>").text(el);
            //     lyrics.append(lyricEl);
            // });  
            var youtubeLink = JSON.parse(response.result[0].media)[0].url;
            var youtube = $("<a>").attr({
                "class": "card-text btn btn-danger",
                "href": youtubeLink
            }).text("Youtube");   
            cardBody.append(title, moreBtn, artist, youtube, createBTn(1));
            card.append(cardBody);
            $("#resultDisplay").append(card);          
        })
    }else{
        alertMsg();
    }
}

function displayResultBio(response){
    if(response.artists){
        var result = response.artists[0];
        var card = $("<div>").addClass("col-12 card mb-2");
        var cardBody = $("<div>").addClass("card-body");
        var artist = $("<h5>").addClass("card-title").text(result.strArtist);
        var year = $("<p>").addClass("card-text").text(result.intFormedYear);
        // var bio = $("<p>").addClass("card-text").text(result.strBiographyEN);
        var bio = $("<div>").addClass("card-text");
        var bioLine = result.strBiographyEN.split("\n");
        bioLine.forEach(function(el){
            var bioEl = $("<p>").text(el);
            bio.append(bioEl);
        });    
        cardBody.append(artist,year,bio,createBTn(1));
        card.append(cardBody);
        $("#resultDisplay").append(card);  
    }
}

function displayResultArtist(response){
    var album = response.album;
    console.log(album);
    var albumCollection = response.album;
    albumCollection.forEach(function(element, i){
        var card = $("<div>").attr({
            "class": "col-12 col-md-6 col-lg-4 card mb-2"
        });
        var cardBody = $("<div>").addClass("card-body");
        var title = $("<h5>").attr({
            "class": "card-title text-center albumTitle",
            "id": "title"+i,
        }).text(element.strAlbum);
        var artist = $("<p>").addClass("card-text text-center").text(element.strArtist);            
        // var lyrics = $("<div>").addClass("card-text");
        // var lyricsLine = element.lyrics.split("\n");
        // lyricsLine.forEach(function(el){
        //     var lyricEl = $("<p>").text(el);
        //     lyrics.append(lyricEl);
        // });         
        cardBody.append(title, artist, createBTn(1));
        card.append(cardBody);
        $("#resultDisplay").append(card);          
    })
}

function displayResultSong(response){

}

function alertMsg(){
    console.log("error");
}

function displayDetailAlbum(response){
    var album = response.album[0];
    // var result = response.artists[0];
    var card = $("<div>").addClass("col-12 card mb-2");
    var cardBody = $("<div>").addClass("card-body");
    var artist = $("<h5>").addClass("card-title").text(album.strAlbum);
    var year = $("<p>").addClass("card-text").text(album.intYearReleased);
    // var bio = $("<p>").addClass("card-text").text(result.strBiographyEN);
    var bio = $("<div>").addClass("card-text");
    var bioLine = album.strDescriptionEN.split("\n");
    bioLine.forEach(function(el){
        var bioEl = $("<p>").text(el);
        bio.append(bioEl);
    });    
    cardBody.append(artist,year,bio);
    card.append(cardBody);
    $("#detailsDisplay").append(card);  
}

function displayDetailLyrics(response){
    
}