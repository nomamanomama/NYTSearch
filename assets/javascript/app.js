//make variable to store queryURL
var queryURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=";
var queryURLend = "&api-key=005ffad83ef24e5aa4a4232b7c24957b";
var apiKey = "005ffad83ef24e5aa4a4232b7c24957b";
//make variable to store user input
var searchTopic, limit, startYear, endYear;

$(document).ready( function() {

    //event handler for submit form
    $("#search").on("click", function (e) {
        e.preventDefault();
        searchTopic = $("#search-term").val().trim();
        limit = $("#num-records").val().trim();
        startYear = $("#start-year").val().trim();
        endYear = $("#end-year").val().trim();

        //build query from search criteria
        queryURL += searchTopic;
        queryURL += "&begin_date=" + startYear + "0101";
        queryURL += "&end_date=" + endYear + "0101";
        queryURL += queryURLend;
        console.log(queryURL);
        //ajax call to NYT api
        $.ajax({
            url: queryURL,
            method: "GET"
        //display result articles    
        }).then (function(response){
            console.log(response.response.docs);

            //loop through the responses and display the number of records requested

            var result = response.response.docs;
            for (var i= 0; i< result.length;i++){
                var newDiv = $("<div>");
                var headline = $("<h2>").text(result[i].headline);
                var snippet = $("<p>").text(result[i].snippet);
                var web_url = $("<a>").attr("src", result[i].web_url);
                var pub = $("<p>").text(result[i].pub_date);
                var byline = $("<p>").text("By: " + result[i].byline.original);

                newDiv.append(headline, snippet, web_url, pub, byline);
                
                $("#articles-display").newDiv;
            }
        }); 

    });

    $("#clear").on("click", function (e) {
        $("#articles-display").empty();
    });


});