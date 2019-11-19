var auddAPIKey = "d5816eb0cda1bb2190e56d50e3158e61";
var flag = 1;//this is the indicator of the title on more box
var titleLength = 3;//this is the lenght of the title

init();
$("#result").children().children().append(createBTn(0));

$("#searchBtn").on("click", function(){
    getMusic();
    result();
});

$("#result").on("click","#backBtn",function(){
    init();
    $("#inputGroup").select().val("0");
    $("#userInput").val("");
});

$("#result").on("click","#moreBtn",function(){
    var flag = $(this).attr("flag");
    console.log($(this).parent(".card-body"));
    console.log($(this).parent(".card-body").children(".card-title").attr("show-value"));
    console.log($(this).parent(".card-body").children(".card-title").attr("hide-value"));
    if(flag === "1"){
        $(this).parent(".card-body").children(".card-title").text($(this).parent(".card-body").children(".card-title").attr("show-value"));
        $(this).attr("flag",0);
    }else{
        $(this).parent(".card-body").children(".card-title").text($(this).parent(".card-body").children(".card-title").attr("hide-value"));
        $(this).attr("flag",1);
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
    var queryURL = "https://api.audd.io/findLyrics/?q="+input+"&api_token="+auddAPIKey;
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

function displayResultLyrics(response){
    if(response.status === "success"){
        console.log("success");
        console.log(response.media);
        var songCollection = response.result;
        songCollection.forEach(function(element, i){
            console.log(element.media);
            var card = $("<div>").attr({
                "class": "col-12 col-md-6 col-lg-4 card mb-2",
                "title-value": element.full_title,
                "artist-value": element.artist
            });
            console.log(element.full_title.split(" ").slice(0,titleLength));
            var cardBody = $("<div>").addClass("card-body");
            var moreBtn = moreForTitle(element.full_title,i);
            var title = $("<h5>").attr({
                "class": "card-title text-center",
                "id": "title"+i,
                "hide-value": element.full_title.split(" ").slice(0, titleLength),
                "show-value": element.full_title
            }).text(element.full_title.split(" ").slice(0,titleLength));
            var artist = $("<p>").addClass("card-text text-center").text(element.artist);            
            // var lyrics = $("<div>").addClass("card-text");
            // var lyricsLine = element.lyrics.split("\n");
            // lyricsLine.forEach(function(el){
            //     var lyricEl = $("<p>").text(el);
            //     lyrics.append(lyricEl);
            // });  
            // title.append(moreBtn);          
            cardBody.append(title, moreBtn, artist, createBTn(1));
            card.append(cardBody);
            $("#result").append(card);          
        })
    }else{
        alertMsg();
    }
}

function moreForTitle(title,i){
    //get the length of the word in a title string
    var length = title.split(" ").length;
    console.log(title.split(" "));
    console.log(length);
    if(length>titleLength+1){
        var btn = createBTn(2);
    }
    return btn;
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