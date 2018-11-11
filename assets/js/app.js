$(document).ready(function () {
    //an array of games
    let gameNames = ["mario", "zelda", "street fighter", "diablo", "vermintide", "total war", "ninja gaiden"];


    function displayGifs(game) {

        // let game;
        let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=jajp3BVmiLgMVM07VdVGC8p5V2ae2SAC&q=" + game + "&limit=10&offset=0&rating=G&lang=en";

        // sends out the API call
        $.ajax({
            url: queryURL,
            method: "GET"
            // when the api gets a response, the following text runs
        }).then(function (response) {

            // create a variable to represent the div the gifs will be going into
            let gifDiv = $(".gameGifs");

            //create a loop that cycles through all the gifs within the array of images
            for (var i = 0; i < response.data.length; i++) {

                // create a variable to contain the rating the current gif within the loop
                let rating = response.data[i].rating;

                console.log(response.data[i]);

                // create a variable that stores the text of the rating
                let pOne = $("<p>").text("Rating: " + rating);

                // append the rating variable to the div
                gifDiv.prepend(pOne);

                //grab the image information from the API
                let image = response.data[i].images.fixed_width_still.url;

                //store the image information in the var
                let pTwo = $("<img>").attr("src", image);

                pTwo.attr("data-state", "still");

                pTwo.attr("gif-ani", response.data[i].images.fixed_width.url);

                pTwo.attr("gif-still", response.data[i].images.fixed_width_still.url);

                // append the image to the gifDiv
                gifDiv.prepend(pTwo);

                // prepend the images that came before it to the 
                $(".gameGifs").append(gifDiv);
            }
        })
    };

    //function that creates buttons when entering data into the search bar
    function generateButtons() {

        // empties the contents of the gameDiv in the html
        $("#gameDiv").empty();

        // start a for loop that repeats until reaching the number of items in the gameNames array
        for (var i = 0; i < gameNames.length; i++) {

            // create a variable that is a button
            var b = $("<button>");

            // give the buttons a class name
            b.addClass("gameBtn");

            // when clicking b, it applys the attribute array value of i
            b.attr("game-name", gameNames[i]);

            //writes the name of i on to the button
            b.text(gameNames[i]);

            // appends the button to the div
            $("#gameDiv").append(b);
        }
    }

    //on click function that adds a button to the array
    // $(".categorybtn").on("click", function (event) {
    $(document).on("click", ".categorybtn", function (event) {
        event.preventDefault();

        // declaring the variable that is entered by the user
        game = $("#gameSearch").val().trim();

        // pushing the variable entered by the user to the array
        gameNames.push(game);

        // clears the search field
        $("#gameSearch").reset;

        //runs the generateButtons function that creates buttons for the products within the array
        generateButtons();
    });

    // run the display gify links
    $(document).on("click", ".gameBtn", function () {

        game = $(this).attr("game-name")

        event.preventDefault();

        displayGifs(game);

    });

    $(document).on("click", ".gameBtn", function(){

        var state = $(this).attr("data-state");

        if(state === "still") {
            $(this).attr("src", $(this).attr("gif-ani"));
            $(this).attr("data-state", "animate");
        } 
        else {
            $(this).attr("src", $(this).attr("gif-still"));
            $(this).attr("data-state", "still");
        }
    });

    generateButtons();
});