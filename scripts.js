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

const cat_image_descr = document.getElementById("cat-img");
const cat_image2_descr = document.getElementById("cat-img2");
const cat_image3_descr = document.getElementById("cat-img3");
// const cat_image4_descr = document.getElementById("cat-img4");

const about_box = document.getElementById("about-box");
const about_box_link = document.getElementById("about-box-link");
about_box_link.addEventListener("click", showAboutBox);

function showAboutBox() {
    random_cat_box.classList.add("hide");
    cat_card_box.classList.add("hide");
    about_box.classList.remove("hide");
}

// settings for cat breed list
var settingsBreed = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.thecatapi.com/v1/breeds?attach_breed=0",
    "method": "GET",
    "headers": {
        "x-api-key": ""
    }
}

// settings for random cat image
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.thecatapi.com/v1/images/search?size=100",
    "method": "GET",
    "headers": {
        "x-api-key": ""
    }
}

let api_key;
apiKeyJsonData();

// copy the api key from JSON file
function apiKeyJsonData() {
    // copy data from JSON
    fetch("App_Data/keys.json") // fetch(url) ---- for json file on the same level
        .then(res => res.json())
        .then(data => {
            // copy data from JSON into local variable
            api_key = JSON.parse(JSON.stringify(data));
            settingsBreed.headers["x-api-key"] = api_key[0].api_key;
            settings.headers["x-api-key"] = api_key[0].api_key;
        })
        .catch((error) => {
            console.log(error);
        })
}

// show the random cat image area and hide the other areas
function showRandomCatImage() {
    $.ajax(settings).done(function(response) {
        console.log("zzzzzzzzzzz " + response[0].url);
        $("#random-cat-img").attr("src", response[0].url);
        about_box.classList.add("hide");
        cat_card_box.classList.add("hide");
        random_cat_box.classList.remove("hide");
    });
}

// display the cat breed card and hide the other displayed areas
function showCatBreedCard() {
    currentCatBreed = 0;
    populateCatBreedCard();
    about_box.classList.add("hide");
    random_cat_box.classList.add("hide");
    cat_card_box.classList.remove("hide");
}

let rrr;

initializeCatBreedList();

// initializes the cat breed list with the api response
function initializeCatBreedList() {
    $.ajax(settingsBreed).done(function(response) {
        // console.log("Cat breed list length: " + response.length);
        catBreedList = response;
        currentCatBreed = 0;
        populateCatBreedCard();
    });
}

// populates the cat breed card accordingly to the current breeed index
function populateCatBreedCard() {
    // makes sure the cat breed array curend index isn't out of bounds
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

        // check if the current element of the cat breed array has all the properties needed for display
        // if a property does not exist, it will be replaced by default text
        if (catBreedList[currentCatBreed].hasOwnProperty('image')) {
            $("#cat-breed-img").attr("src", catBreedList[currentCatBreed].image.url);
            $("#cat-breed-img").attr("alt", "Image not found");
        }

        if (catBreedList[currentCatBreed].hasOwnProperty("name")) {
            $("#cat-breed-name").text(catBreedList[currentCatBreed].name);
        } else {
            $("#cat-breed-name").text("...");
        }

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

// repopulates the cat breed card with the current cat breeed info given by the current index in the cat breeds array
function changeCatBreedCard(event) {
    // verify from which button the function was called
    if (event.target.id === "previous-cat-breed-btn") {
        if (currentCatBreed - 1 >= 0) {
            currentCatBreed -= 1;
        }
        populateCatBreedCard();
    } else if (event.target.id === "next-cat-breed-btn") {
        if (currentCatBreed + 1 <= catBreedList.length - 1) {
            currentCatBreed += 1;
        }
        populateCatBreedCard();
    }
}

// set intervals for Welcome area images changing
// setInterval(changeCatImage1, 4000);
// setInterval(changeCatImage2, 5000);
// setInterval(changeCatImage3, 6000);

// change the 3 cat images from the description area
changeCatImage1();
changeCatImage2();
changeCatImage3();

// loads the 3 cat images in the description area and waites 2 seconds to make sure the api calls to get the images are made
setTimeout(() => {
    cat_image_descr.classList.remove("hide");
    cat_image2_descr.classList.remove("hide");
    cat_image3_descr.classList.remove("hide");
    // cat_image4_descr.classList.remove("hide");
}, 2000)

// api calls to change the 3 images from the description area
function changeCatImage1() {
    $.ajax(settings).done(function(response) {
        $("#cat-img").attr("src", response[0].url);
    });
}

function changeCatImage2() {
    $.ajax(settings).done(function(response) {
        $("#cat-img2").attr("src", response[0].url);
    });
}

function changeCatImage3() {
    $.ajax(settings).done(function(response) {
        $("#cat-img3").attr("src", response[0].url);
    });
}

// make image animation in About area, by changing its size at every 0.8 seconds
setInterval(modifyPawImageSize, 800);
const cat_paw_image = document.getElementById("cat-paws-img");

// toggles the zoom class for the About area image
function modifyPawImageSize() {
    if (!about_box.classList.contains("hide")) {
        if (cat_paw_image.classList.contains("zoom")) {
            cat_paw_image.classList.remove("zoom");
        } else {
            cat_paw_image.classList.add("zoom");
        }

        console.log("QQQQQQQQQQQQqq");
    }
}