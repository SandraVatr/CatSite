var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.thecatapi.com/v1/images/search?size=100",
    "method": "GET",
    "headers": {
        "x-api-key": "5fc2e2ba-b43f-4240-87c0-cea8d35d15a7"
    }
}

let rrr;

// $.ajax(settings).done(function(response) {
//     console.log(response);
//     // const cat = JSON.parse(response);
//     console.log("cat url " + response[0].url);
//     rrr = response;

// });
let catBreedList;
let currentCatBreed = 0;

var settingsBreed = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.thecatapi.com/v1/breeds?attach_breed=0",
    "method": "GET",
    "headers": {
        "x-api-key": "5fc2e2ba-b43f-4240-87c0-cea8d35d15a7"
    }
}

function getCatBreed() {

    $.ajax(settingsBreed).done(function(response) {
        console.log("RRRRRRR " + response[30].image);
        console.log("Cat breeds  " + response[0].name + "............" + response[0].image.url);
        catBreedList = response;
        let randomNr = Math.floor(Math.random() * 100);
        if (randomNr >= 34) {
            randomNr -= 34;
        }
        currentCatBreed = randomNr;
        console.log(randomNr);
        if (response[currentCatBreed].hasOwnProperty('image')) {
            $("#cat-breed-img").attr("src", response[currentCatBreed].image.url);
        } else {
            $("#cat-breed-img").attr("alt", "Image not found");
        }
        // $("#cat-breed-img").attr("src", response[currentCatBreed].image.url);
        // console.log("XXXXXXXXXXXX " + catBreedList[0].image.url);
        if (response[currentCatBreed].hasOwnProperty("name")) {
            $("#cat-breed-name").text(response[currentCatBreed].name);
        } else {
            $("#cat-breed-name").text("...");
        }

        //currentCatBreed++;
        if (response[currentCatBreed].hasOwnProperty("description")) {
            $('#cat-description').text(response[currentCatBreed].description);
        } else {
            $('#cat-description').text("Description: ...");
        }

        if (response[currentCatBreed].hasOwnProperty("origin")) {
            $('#origin').html("<b>Origin:</b>  " + response[currentCatBreed].origin);
        } else {
            $('#origin').html("<b>Origin:</b> unknown");
        }

        if (response[currentCatBreed].hasOwnProperty("wikipedia_url")) {
            $('#wikipedia-link').attr("href", response[currentCatBreed].wikipedia_url);
        } else {
            $('#wikipedia-link').attr("href", "#");
        }

        if (response[currentCatBreed].hasOwnProperty("weight")) {
            $('#weight').html("<b>Weight:</b>  " + response[currentCatBreed].weight.metric + " kg");
        } else {
            $('#weight').html("<b>Weight:</b> unknown");
        }


        if (response[currentCatBreed].hasOwnProperty("life_span")) {
            $('#life-span').html("<b>Life span:</b>  " + response[currentCatBreed].life_span + " years");
        } else {
            $('#life-span').html("<b>Life span:</b> unknown");
        }


    });
}

const catBreedBtn = document.getElementById("breed");
catBreedBtn.addEventListener("click", () => {
    getCatBreed();
    // $("#cat-breed-img").attr("src", catBreedList[0].image.url);
    // console.log("XXXXXXXXXXXX " + catBreedList[0].image.url);
    // $("#cat-breed-name").text(catBreedList[0].name);
})

// var settingsBreed = {
//     "async": true,
//     "crossDomain": true,
//     "url": "https://api.thecatapi.com/v1/breeds?attach_breed=0",
//     "method": "GET",
//     "headers": {
//         "x-api-key": "5fc2e2ba-b43f-4240-87c0-cea8d35d15a7"
//     }
// }

// $.ajax(settingsBreed).done(function(response) {
//     console.log("Cat breeds  " + response[0].name + "............" + response[0].image.url);
// });

function getCatImage() {
    $.ajax(settings).done(function(response) {
        console.log(response);
        // const cat = JSON.parse(response);
        // console.log("cat url " + response[0].url);
        rrr = response;
    });

}

getCatImage();

const b = document.getElementById("btn");
b.addEventListener("click", () => {
    getCatImage();
    $("#aaa").text("Here is your cat image!"); //add text+ tags
    $("#cat-img").attr("src", rrr[0].url);
})