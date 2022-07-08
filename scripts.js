let catBreedList;
let currentCatBreed = 0;
const cat_breeds_link = document.getElementById("cat-breeds-link");
cat_breeds_link.addEventListener("click", showCatBreedCard);
const next_cat_breed_button = document.getElementById("next-cat-breed-btn");
const previous_cat_breed_button = document.getElementById("previous-cat-breed-btn");
next_cat_breed_button.addEventListener("click", changeCatBreedCard);
previous_cat_breed_button.addEventListener("click", changeCatBreedCard);
const cat_card_count_text = document.getElementById("cat-card-count");

const cat_card_box = document.getElementById("cat-card-box");

const random_cat_link = document.getElementById("random-cat");
random_cat_link.addEventListener("click", showRandomCatImage);
const random_cat_box = document.getElementById("random-cat-box");


var settingsBreed = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.thecatapi.com/v1/breeds?attach_breed=0",
    "method": "GET",
    "headers": {
        "x-api-key": "5fc2e2ba-b43f-4240-87c0-cea8d35d15a7"
    }
}


function showRandomCatImage() {
    random_cat_box.classList.remove("hide");
    // $("#random-cat-img").attr("src", "catImage3.png");
    $.ajax(settings).done(function(response) {
        console.log("zzzzzzzzzzz " + response[0].url);
        $("#random-cat-img").attr("src", response[0].url);
    });
}

function showCatBreedCard() {
    currentCatBreed = 0;
    populateCatBreedCard();
    cat_card_box.classList.remove("hide");
}


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


initializeCatBreedList();

function initializeCatBreedList() {

    $.ajax(settingsBreed).done(function(response) {
        // console.log("RRRRRRR " + response[30].image);
        // console.log("Cat breeds  " + response[0].name + "............" + response[0].image.url);
        console.log("Cat breed list length: " + response.length);
        catBreedList = response;
        currentCatBreed = 0;
        populateCatBreedCard();

        // console.log("buttonnnnnnn " + catBreedList[0].name);
        // let randomNr = Math.floor(Math.random() * 100);
        // if (randomNr >= 34) {
        //     randomNr -= 34;
        // }
        // currentCatBreed = randomNr;
        // console.log(randomNr);
        // if (response[currentCatBreed].hasOwnProperty('image')) {
        //     $("#cat-breed-img").attr("src", response[currentCatBreed].image.url);
        //     // console.log("BBBBBBBBBBBB " + response[currentCatBreed].image.url);
        // } else {
        //     $("#cat-breed-img").attr("alt", "Image not found");
        // }
        // // $("#cat-breed-img").attr("src", response[currentCatBreed].image.url);
        // // console.log("XXXXXXXXXXXX " + catBreedList[0].image.url);
        // if (response[currentCatBreed].hasOwnProperty("name")) {
        //     $("#cat-breed-name").text(response[currentCatBreed].name);
        // } else {
        //     $("#cat-breed-name").text("...");
        // }

        // //currentCatBreed++;
        // if (response[currentCatBreed].hasOwnProperty("description")) {
        //     $('#cat-description').text(response[currentCatBreed].description);
        // } else {
        //     $('#cat-description').text("Description: ...");
        // }

        // if (response[currentCatBreed].hasOwnProperty("origin")) {
        //     $('#origin').html("<b>Origin:</b>  " + response[currentCatBreed].origin);
        // } else {
        //     $('#origin').html("<b>Origin:</b> unknown");
        // }

        // if (response[currentCatBreed].hasOwnProperty("wikipedia_url")) {
        //     $('#wikipedia-link').attr("href", response[currentCatBreed].wikipedia_url);
        // } else {
        //     $('#wikipedia-link').attr("href", "#");
        // }

        // if (response[currentCatBreed].hasOwnProperty("weight")) {
        //     $('#weight').html("<b>Weight:</b>  " + response[currentCatBreed].weight.metric + " kg");
        // } else {
        //     $('#weight').html("<b>Weight:</b> unknown");
        // }


        // if (response[currentCatBreed].hasOwnProperty("life_span")) {
        //     $('#life-span').html("<b>Life span:</b>  " + response[currentCatBreed].life_span + " years");
        // } else {
        //     $('#life-span').html("<b>Life span:</b> unknown");
        // }


    });
}

function populateCatBreedCard() {
    if (currentCatBreed >= 0 && currentCatBreed <= catBreedList.length - 1) {
        if (currentCatBreed === 0) {
            previous_cat_breed_button.classList.add("hide");
        } else if (currentCatBreed === catBreedList.length - 1) {
            next_cat_breed_button.classList.add("hide");
        } else {
            previous_cat_breed_button.classList.remove("hide");
            next_cat_breed_button.classList.remove("hide");
        }

        cat_card_count_text.innerText = (currentCatBreed + 1) + "/" + catBreedList.length;

        if (catBreedList[currentCatBreed].hasOwnProperty('image')) {
            $("#cat-breed-img").attr("src", catBreedList[currentCatBreed].image.url);
            // console.log("BBBBBBBBBBBB " + response[currentCatBreed].image.url);
        } else {
            $("#cat-breed-img").attr("alt", "Image not found");
        }
        // $("#cat-breed-img").attr("src", response[currentCatBreed].image.url);
        // console.log("XXXXXXXXXXXX " + catBreedList[0].image.url);
        if (catBreedList[currentCatBreed].hasOwnProperty("name")) {
            $("#cat-breed-name").text(catBreedList[currentCatBreed].name);
        } else {
            $("#cat-breed-name").text("...");
        }

        //currentCatBreed++;
        if (catBreedList[currentCatBreed].hasOwnProperty("description")) {
            $('#cat-description').text(catBreedList[currentCatBreed].description);
        } else {
            $('#cat-description').text("Description: ...");
        }

        if (catBreedList[currentCatBreed].hasOwnProperty("origin")) {
            $('#origin').html("<b>Origin:</b>  " + catBreedList[currentCatBreed].origin);
        } else {
            $('#origin').html("<b>Origin:</b> unknown");
        }

        if (catBreedList[currentCatBreed].hasOwnProperty("wikipedia_url")) {
            $('#wikipedia-link').attr("href", catBreedList[currentCatBreed].wikipedia_url);
        } else {
            $('#wikipedia-link').attr("href", "#");
        }

        if (catBreedList[currentCatBreed].hasOwnProperty("weight")) {
            $('#weight').html("<b>Weight:</b>  " + catBreedList[currentCatBreed].weight.metric + " kg");
        } else {
            $('#weight').html("<b>Weight:</b> unknown");
        }


        if (catBreedList[currentCatBreed].hasOwnProperty("life_span")) {
            $('#life-span').html("<b>Life span:</b>  " + catBreedList[currentCatBreed].life_span + " years");
        } else {
            $('#life-span').html("<b>Life span:</b> unknown");
        }

    }
}


function changeCatBreedCard(event) {
    // verify from which button the function was called
    if (event.target.id === "previous-cat-breed-btn") {
        if (currentCatBreed - 1 >= 0) {
            currentCatBreed -= 1;
        }
        populateCatBreedCard();

    } else if (event.target.id === "next-cat-breed-btn") {
        // console.log("buttonnnnnnn " + catBreedList[currentCatBreed].name);
        if (currentCatBreed + 1 <= catBreedList.length - 1) {
            currentCatBreed += 1;
        }
        populateCatBreedCard();
    }

}

const catBreedBtn = document.getElementById("breed");
catBreedBtn.addEventListener("click", () => {
    initializeCatBreedList();
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

        $("#cat-img").attr("src", rrr[0].url);
        // $("#random-cat-img").attr("src", response.url);
    });

}

// getCatImage();

const b = document.getElementById("btn");
b.addEventListener("click", () => {
    getCatImage();
    // $("#aaa").text("Here is your cat image!"); //add text+ tags
    // $("#cat-img").attr("src", rrr[0].url);
})