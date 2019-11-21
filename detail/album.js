$("").on("click", function(){
    var input = $("").val().trim();
    var queryURL = ""
    
    $.ajax({
        url:queryURL,
        method: "GET"
    }).then(function(response){
        displayalbumDes();
        displayBio();
    })
})

function displayalbumDes(){

}

function displayBio(){

}

function displayImg{

}

function displayDetailAlbum(response){
    var album = response.album[0];
    // var result = response.artists[0];
    var card = $(“<div>“).addClass(“col-12 card mb-2”);
    var cardBody = $(“<div>“).addClass(“card-body”);
    var artist = $(“<h5>“).addClass(“card-title”).text(album.strAlbum);
    var year = $(“<p>“).addClass(“card-text”).text(album.intYearReleased);
    // var bio = $(“<p>“).addClass(“card-text”).text(result.strBiographyEN);
    var bio = $(“<div>“).addClass(“card-text”);
    var bioLine = album.strDescriptionEN.split(“\n”);
    bioLine.forEach(function(el){
        var bioEl = $(“<p>“).text(el);
        bio.append(bioEl);
    });
    cardBody.append(artist,year,bio);
    card.append(cardBody);
    $(“#detailsDisplay”).append(card);
 }