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