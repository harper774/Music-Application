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
            var search = $(this).parent(".card-footer").parent(".card").children(".card-header").children(".card-header-title").attr("id");
            search = search.replace(/[^0-9]/ig,"");//delete the non-number characters in the string
            console.log(search);
            displayDetailLyrics(search);
            break;
        case  "2":
            var album = $(this).parent(".card-footer").parent(".card").children(".card-header").children(".card-header-title").text();
            var search = $(this).parent(".card-footer").parent(".card").children(".card-header").children(".card-header-title").attr("id");
            search = search.replace(/[^0-9]/ig,"");
            albumSearch(album,search);
            break;
    }
});

$("#result").on("click", "#artistName", function(){
    details();
    bioSearch();
});

//this is where all the functions are put
function init(){
    $("#indexPage").css("display", "block");
    $("#resultPage").css("display", "none");
    $("#detailsPage").css("display", "none");
    $("#trending").empty();
    trendingSearch();
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
    $("#resultDisplay").html('<progress class="progress is-small is-primary" max="100">15%</progress>');
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

function trendingSearch(){
    $("#trending").html('<progress class="progress is-small is-primary" max="100">15%</progress>');
    var queryURLS = "https://theaudiodb.com/api/v1/json/1/trending.php?country=us&type=itunes&format=singles";
    $.ajax({
        url: queryURLS,
        method: "GET"
    }).then(function(response){
        console.log(response);
        console.log(response.trending[1]);
        // $("#trending").empty();
        var col = $("<div>").addClass("column is-half is-mobile");
        var card = $("<div>").attr({
            "class": "card has-text-centered mt-card is-light",
            "style": "background-image:url('"+response.trending[0].strTrackThumb+"'); background-size:cover; color: white"
        });
        var cardHeader = $("<header>").addClass("card-header");
        var title = $("<p>").attr({
            "class": "card-header-title is-centered",
            "style": "color: white"
        }).text("Current Trending Singles: ");
        var cardContent = $("<div>").addClass("card-content is-centered");
        var content = $("<div>").addClass("content");           
        response.trending.forEach(function(element,i){ 
            // i = i+1; 
            var li = $("<div>").text(i+1+". "+element.strTrack + " ---- " + element.strArtist); 
            content.append(li);
        });        
        cardHeader.append(title);
        // content.append(artist);  
        cardContent.append(content);
        card.append(cardHeader, cardContent);
        col.append(card)
        $("#trending").append(col);
    });

    var queryURLA = "https://theaudiodb.com/api/v1/json/1/trending.php?country=us&type=itunes&format=albums";
    $.ajax({
        url: queryURLA,
        method: "GET"
    }).then(function(response){
        console.log(response);
        var col = $("<div>").addClass("column is-half is-mobile");
        var card = $("<div>").attr({
            "class": "card has-text-centered mt-card is-light",
            "style": "background-image:url('"+response.trending[0].strAlbumThumb+"')"
        });
        card.css("background-color: red");
        var cardHeader = $("<header>").addClass("card-header");
        var title = $("<p>").attr({
            "class": "card-header-title is-centered",
            // "id": "title",
        }).text("Current Trending Albums: ");
        var cardContent = $("<div>").addClass("card-content is-centered");
        var content = $("<div>").addClass("content");           
        response.trending.forEach(function(element,i){ 
            // i = i+1; 
            var li = $("<div>").text(i+1+". "+element.strAlbum + " ---- " + element.strArtist); 
            content.append(li);
        });        
        cardHeader.append(title);
        // content.append(artist);  
        cardContent.append(content);
        card.append(cardHeader, cardContent);
        col.append(card)
        $("#trending").append(col);
    });
}

function lyricSearch(){
    var queryURL = "https://api.audd.io/findLyrics/?q="+input+"&api_token="+auddAPIKey;
    console.log(queryURL);
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

function albumSearch(album,i){
    $("#detailsDisplay").html('<progress class="progress is-small is-primary" max="100">15%</progress>');
    var queryURL = "https://theaudiodb.com/api/v1/json/1/searchalbum.php?s="+input+"&a="+album;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        $("#detailsDisplay").empty();
        console.log("5.Album");
        console.log(response);
        var album = response.album[0];
        console.log(album);
        displayDetailAlbum(album);
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
        $("#resultDisplay").empty();
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
            var artist = $("<div>").attr({
                "id": "artistName",
                "value": element.artist
            }).text(element.artist);            
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
                "class": "button is-small is-danger is-rounded mt-card",
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
        $("#detailsDisplay").empty();
        var result = response.artists[0];
        var col = $("<div>").addClass("column is-mobile");
        var card = $("<div>").attr({
            "class": "card has-text-centered mt-card is-light",
        });
        // var moreBtn = moreForTitle(element.title,i);
        var cardHeader = $("<header>").addClass("card-header");
        var title = $("<p>").attr({
            "class": "card-header-title is-centered",
        }).text(result.strArtist);
        var cardContent = $("<div>").addClass("card-content is-centered");
        var content = $("<div>").addClass("content");
        var bio = $("<div>").addClass("card-content");            
        var bioLine = result.strBiographyEN.split("\n");
        //this is to ensure that if there is no description
        //there will be notice inside ther area
        if(bioLine){
            bioLine.forEach(function(el){
                var bioEl = $("<p>").text(el);
                bio.append(bioEl);
            });  
        }else{
            bio.text("Sorry the detailed information for "+result.strArtist+" is not yet ready. Please try other artists.");
        }
        var cardFooter = $("<footer>").addClass("card-footer"); 
        cardHeader.append(title);
        content.append(bio);  
        cardContent.append(content);
        card.append(cardHeader, cardContent, cardFooter);
        col.append(card)
        $("#detailsDisplay").append(col);
    }
}

function displayResultArtist(response){
    var album = response.album;
    $("#resultDisplay").empty();
    console.log(album);
    var albumCollection = response.album;
    albumCollection.forEach(function(element, i){
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
        }).text(element.strAlbum);
        var cardContent = $("<div>").addClass("card-content is-centered");
        var content = $("<div>").addClass("content");
        var artist = $("<button>").attr({
            "id": "artistName",
            "value": element.strArtist,
            "class": "button is-danger"
        }).text(element.strArtist);            
        //the reason of doing youtubeLinkP is bacause the audd api
        //is not so clever with result
        //sometimes the result's key-value pari sequence will change
        var cardFooter = $("<footer>").addClass("card-footer"); 
        var detailsBtn = $("<a>").attr({
            "id":"detailsBtn",
            "class": "is-dark is-rounded button card-footer-item"
        }).text("Details");
        cardFooter.append(detailsBtn);
        cardHeader.append(title);
        content.append(artist);  
        cardContent.append(content);
        card.append(cardHeader, cardContent, cardFooter);
        col.append(card)
        $("#resultDisplay").append(col);           
    })
}

function alertMsg(){
    console.log("error");
}

function displayDetailAlbum(album){
    // var album = response.album[0];
    $("#detailsDisplay").empty();
    var col = $("<div>").addClass("column is-mobile");
    var card = $("<div>").attr({
        "class": "card has-text-centered mt-card is-light",
    });
    // var moreBtn = moreForTitle(element.title,i);
    var cardHeader = $("<header>").addClass("card-header");
    var title = $("<p>").attr({
        "class": "card-header-title is-centered",
        "id": "title"
    }).text(album.strAlbum);
    var title2 = $("<p>").attr({
        "class": "card-header-title is-centered",
    }).text(album.strArtist);
    var cardImage = $("<div>").addClass("card-image");
    var figure = $("<figure>").addClass("image is-1by1");
    var img = $("<img>").attr({
        "src": album.strAlbumThumb
    });
    cardImage.append(figure.append(img));
    var cardContent = $("<div>").addClass("card-content is-centered");
    var content = $("<div>").addClass("content");
    var bio = $("<div>");
    var artist = $("<div>").text(album.intYearReleased);            
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
    var cardFooter = $("<footer>").addClass("card-footer"); 
    cardHeader.append(title, title2);
    content.append(artist,bio);  
    cardContent.append(content);
    card.append(cardImage, cardHeader, cardContent, cardFooter);
    col.append(card)
    $("#detailsDisplay").append(col);
}

function displayDetailLyrics(i){
    $("#detailsDisplay").empty();
    var col = $("<div>").addClass("column is-mobile");
    var card = $("<div>").attr({
        "class": "card has-text-centered mt-card is-light",
    });
    var cardHeader = $("<header>").addClass("card-header");
    var cardContent = $("<div>").addClass("card-content is-centered");
    var content = $("<div>").addClass("content");
    var lyrics = $("<div>");
    lyricsLineArray[i].forEach(function(el){
        var lyricEl = $("<p>").text(el);
        lyrics.append(lyricEl);
    }); 
    // cardHeader.append(title);
    content.append(lyrics);  
    cardContent.append(content);
    card.append(cardHeader, cardContent);
    col.append(card)
    $("#detailsDisplay").append(col);
}