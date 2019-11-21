var auddAPIKey = "d5816eb0cda1bb2190e56d50e3158e61";//this is the apiKey for audd API, 300 requests within thwo weeks' time
var flag = 1;//this is the indicator of the title on more box
var titleLength = 5;//this is the lenght of the title
var input;//this is to store tht user input in this variable
var select;//this is to store the user select in this variable
var lyricsLineArray = [];//thsi is to store the data for lyrics which could be sued fo other functions

init();
// $("#result").children(".card").children().append(createBTn(0));
// $("#details").children(".card").children().append(createBTn(0));

$("#searchBtn").on("click", function(){
    //run getMusic function
    getMusic();
    result();
});

$("#resultTitle").on("click","#backBtn",function(){
    init();
    // $("#inputGroup").select().val("0");
    $("#userInput").val("");
    $("#resultDisplay").empty();
});

$("#detailsTitle").on("click","#backBtn",function(){
    result();
    $("#detailsDisplay").empty();
});

// $("#result").on("click","#moreBtn",function(){
//     var flag = $(this).attr("flag");
//     if(flag === "1"){
//         $(this).parent(".card-body").children(".card-header").text($(this).parent(".card-body").children(".card-header").attr("show-value"));
//         $(this).attr("flag",0);
//     }else{
//         $(this).parent(".card-body").children(".card-header").text($(this).parent(".card-body").children(".card-header").attr("hide-value"));
//         $(this).attr("flag",1);
//     }   
// });

$("#result").on("click", "#detailsBtn", function(){
    details();
    switch(select){
        case "0":
            break;
        case  "1":
            var search = $(this).parent(".card-body").children(".card-header").attr("id");
            search = search.replace(/[^0-9]/ig,"");//delete the non-number characters in the string
            console.log(search);
            displayDetailLyrics(search);
            break;
        case  "2":
            var search = $(this).parent(".card-body").children(".albumTitle").text();
            albumSearch(search);
            break;
        // case  "3":
        //     break;
        // case  "4":
        //     break;
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
        // case "3":
        //     songSearch();
        //     break;
        // case "4":
        //     bioSearch();
    }   
}

function lyricSearch(){
    var queryURL = "https://api.audd.io/findLyrics/?q="+input+"&api_token="+auddAPIKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log("1.Lyric");
        console.log(response);
        console.log(JSON.parse(response.result[0].media));
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

// function songSearch(){
//     var queryURL = "https://theaudiodb.com/api/v1/json/1/searchtrack.php?&t="+input;
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function(response){
//         console.log("3.Song");
//         console.log(response);
//         displayResultSong(response);
//     });
// }

// function bioSearch(){
//     var queryURL = "https://theaudiodb.com/api/v1/json/1/search.php?s="+input;
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function(response){
//         console.log("4.Bio");
//         console.log(response);
//         displayResultBio(response);
//     });
// }

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
            "class":"card-content button is-dark has-text-centered",
            "id": "backBtn"
        }).text("Back");
    }else if(i === 1){
        var btn = $("<button>").attr({
            "class":"card-content button is-dark",
            "id": "detailsBtn"
        }).text("Details");
    }else if(i === 2){
        var btn = $("<button>").attr({
            "class":"card-content button is-dark has-text-right ml-2",
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
            var col = $("<div>").addClass("column is-one-third is-mobile");
            var card = $("<div>").attr({
                "class": "card has-text-centered mt-card is-light",
                "title-value": element.title,
                "artist-value": element.artist
            });
            // var moreBtn = moreForTitle(element.title,i);
            var cardHeader = $("<header>").addClass("card-header");
            var title = $("<p>").attr({
                "class": "card-header-title is-centered",
                "id": "title"+i,
                "hide-value": element.title.split(" ").slice(0, titleLength).join(" "),
                "show-value": element.title
            }).text(element.title.split(" ").slice(0,titleLength).join(" "));
            var cardContent = $("<div>").addClass("card-content is-centered");
            var content = $("<div>").addClass("content");
            var artist = $("<div>").text(element.artist);            
            var lyrics = $("<div>").addClass("card-content");
            var lyricsLine = element.lyrics.split("\n");
            lyricsLineArray[i] = lyricsLine;
            lyricsLine.forEach(function(el){
                var lyricEl = $("<p>").text(el);
                lyrics.append(lyricEl);
            });
            //the reason of doing youtubeLinkP is bacause the audd api
            //is not so clever with result
            //sometimes the result's key-value pari sequence will change
            var youtubeLinkP = JSON.parse(response.result[i].media);
            var youtubeLink;
            youtubeLinkP.forEach(function(el){
                if (el.provider === "youtube"){
                    youtubeLink = el.url;
                }
            });
            var youtube = $("<a>").attr({
                "class": "button is-small is-light is-rounded",
                "href": youtubeLink,
                "target": "_blank"
            }).text("Youtube"); 
            var cardFooter = $("<footer>").addClass("card-footer"); 
            var detailsBtn = $("<a>").attr({
                "id":"detailsBtn",
                "class": "is-dark is-rounded button card-footer-item"
            }).text("Details");
            cardFooter.append(detailsBtn);
            cardHeader.append(title);
            content.append(artist, youtube);  
            cardContent.append(content);
            card.append(cardHeader, cardContent, cardFooter);
            col.append(card)
            $("#resultDisplay").append(col);          
        })
        console.log(lyricsLineArray); 
    }else{
        alertMsg();
    }
}

function displayResultBio(response){
    if(response.artists){
        var result = response.artists[0];
        var card = $("<div>").addClass("is-mobile card mb-2");
        var cardBody = $("<div>").addClass("card-body");
        var artist = $("<h5>").addClass("card-header").text(result.strArtist);
        var year = $("<p>").addClass("card-content").text(result.intFormedYear);
        // var bio = $("<p>").addClass("card-content").text(result.strBiographyEN);
        var bio = $("<div>").addClass("card-content");
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
            "class": "card-header has-text-centered albumTitle",
            "id": "title"+i,
        }).text(element.strAlbum);
        var artist = $("<p>").addClass("card-content has-text-centered").text(element.strArtist);            
        // var lyrics = $("<div>").addClass("card-content");
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
    var albumName = $("<h5>").addClass("card-header").text(album.strAlbum);
    var year = $("<p>").addClass("card-content").text(album.intYearReleased);
    // var bio = $("<p>").addClass("card-content").text(result.strBiographyEN);
    var bio = $("<div>").addClass("card-content");
    var bioAPI = album.strDescriptionEN;
    //this is to ensure that if there is no description
    //there will be notice inside ther area
    if(bioAPI){
        var bioLine = album.strDescriptionEN.split("\n");
        bioLine.forEach(function(el){
            var bioEl = $("<p>").text(el);
            bio.append(bioEl);
        });  
    }else{
        bio.text("Sorry the detailed information for "+album.strAlbum+" of "+album.strArtist+" is not yet ready. Please try other artists.");
    }
    cardBody.append(albumName,year,bio);
    card.append(cardBody);
    $("#detailsDisplay").append(card);  
}

function displayDetailLyrics(i){
    var card = $("<div>").addClass("col-12 card mb-2");
    var cardBody = $("<div>").addClass("card-body");
    var lyrics = $("<div>").addClass("card-content");
    lyricsLineArray[i].forEach(function(el){
        var lyricEl = $("<p>").text(el);
        lyrics.append(lyricEl);
    }); 
    card.append(cardBody, lyrics);
    $("#detailsDisplay").append(card);  
}