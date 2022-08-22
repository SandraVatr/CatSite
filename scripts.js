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
        console.log(catBreedList[0]);
        console.log(catBreedList[1]);
        currentCatBreed = 0;
        populateCatBreedCard();
    });
}

// populates the cat breed card accordingly to the current breeed index
function populateCatBreedCard() {
    // makes sure the cat breed array curend index isn't out of bounds
    if (catBreedList != null) {
        console.log("yessssssssss");

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

            if (catBreedList[currentCatBreed].hasOwnProperty("temperament")) {
                $('#temperament').html("<b>Temperament:</b>  " + catBreedList[currentCatBreed].temperament);
            } else {
                $('#temperament').html("<b>Temperament:</b> unknown");
            }

            // friendly around children property
            if (catBreedList[currentCatBreed].hasOwnProperty("child_friendly")) {
                // determine friendly level out of 5 and assign it
                let friendly_level;
                switch (catBreedList[currentCatBreed].child_friendly) {
                    case 1:
                        friendly_level = "not so friendly";
                        break;
                    case 2:
                        friendly_level = "a little friendly";
                        break;
                    case 3:
                        friendly_level = "mildly friendly";
                        break;
                    case 4:
                        friendly_level = "friendly";
                        break;
                    case 5:
                        friendly_level = "very friendly";
                        break;
                    default:
                        friendly_level = "unknown";
                }

                $('#around-children').html("<b>Around children:</b>  " + friendly_level);
            } else {
                $('#around-children').html("<b>Around children:</b> unknown");
            }

            // friendly around dogs property
            if (catBreedList[currentCatBreed].hasOwnProperty("dog_friendly")) {
                // determine friendly level out of 5 and assign it
                let friendly_level;
                switch (catBreedList[currentCatBreed].dog_friendly) {
                    case 1:
                        friendly_level = "not so friendly";
                        break;
                    case 2:
                        friendly_level = "a little friendly";
                        break;
                    case 3:
                        friendly_level = "mildly friendly";
                        break;
                    case 4:
                        friendly_level = "friendly";
                        break;
                    case 5:
                        friendly_level = "very friendly";
                        break;
                    default:
                        friendly_level = "unknown";
                }

                $('#around-dogs').html("<b>Around dogs:</b>  " + friendly_level);
            } else {
                $('#around-dogs').html("<b>Around dogs:</b> unknown");
            }

            // friendly around strangers property
            if (catBreedList[currentCatBreed].hasOwnProperty("stranger_friendly")) {
                // determine friendly level out of 5 and assign it
                let friendly_level;
                switch (catBreedList[currentCatBreed].stranger_friendly) {
                    case 1:
                        friendly_level = "not so friendly";
                        break;
                    case 2:
                        friendly_level = "a little friendly";
                        break;
                    case 3:
                        friendly_level = "mildly friendly";
                        break;
                    case 4:
                        friendly_level = "friendly";
                        break;
                    case 5:
                        friendly_level = "very friendly";
                        break;
                    default:
                        friendly_level = "unknown";
                }

                $('#around-strangers').html("<b>Around strangers:</b>  " + friendly_level);
            } else {
                $('#around-strangers').html("<b>Around strangers:</b> unknown");
            }


            // vocalisation property
            if (catBreedList[currentCatBreed].hasOwnProperty("vocalisation")) {
                // determine friendly level out of 5 and assign it
                let vocalisation_level;
                switch (catBreedList[currentCatBreed].vocalisation) {
                    case 1:
                        vocalisation_level = "not vocal";
                        break;
                    case 2:
                        vocalisation_level = "a little vocal";
                        break;
                    case 3:
                        vocalisation_level = "mildly vocal";
                        break;
                    case 4:
                        vocalisation_level = "vocal";
                        break;
                    case 5:
                        vocalisation_level = "very vocal";
                        break;
                    default:
                        vocalisation_level = "unknown";
                }

                $('#vocal').html("<b>Vocalisation:</b>  " + vocalisation_level);
            } else {
                $('#vocal').html("<b>Vocalisation:</b> unknown");
            }

            // intellignece property
            if (catBreedList[currentCatBreed].hasOwnProperty("intelligence")) {
                // clear intelligence bar
                $("#intelligence-ball-1").addClass("procentage-not-filled").removeClass("procentage-filled");
                $("#intelligence-ball-2").addClass("procentage-not-filled").removeClass("procentage-filled");
                $("#intelligence-ball-3").addClass("procentage-not-filled").removeClass("procentage-filled");
                $("#intelligence-ball-4").addClass("procentage-not-filled").removeClass("procentage-filled");
                $("#intelligence-ball-5").addClass("procentage-not-filled").removeClass("procentage-filled");

                let intellignece_level = catBreedList[currentCatBreed].intelligence;
                // console.log("intell " + intellignece_level);
                if (intellignece_level >= 1) {
                    $("#intelligence-ball-1").removeClass("procentage-not-filled").addClass("procentage-filled");
                }
                if (intellignece_level >= 2) {
                    $("#intelligence-ball-2").removeClass("procentage-not-filled").addClass("procentage-filled");
                }
                if (intellignece_level >= 3) {
                    $("#intelligence-ball-3").removeClass("procentage-not-filled").addClass("procentage-filled");
                }
                if (intellignece_level >= 4) {
                    $("#intelligence-ball-4").removeClass("procentage-not-filled").addClass("procentage-filled");
                }
                if (intellignece_level >= 5) {
                    $("#intelligence-ball-5").removeClass("procentage-not-filled").addClass("procentage-filled");
                }

                // $('#vocal').html("<b>Vocalisation:</b>  " + vocalisation_level);
            } else {
                // $('#vocal').html("<b>Vocalisation:</b> unknown");
                // console.log("nooooooooooo ");
            }

            // energy property
            if (catBreedList[currentCatBreed].hasOwnProperty("energy_level")) {
                // clear intelligence bar
                $("#energy-ball-1").addClass("procentage-not-filled").removeClass("procentage-filled");
                $("#energy-ball-2").addClass("procentage-not-filled").removeClass("procentage-filled");
                $("#energy-ball-3").addClass("procentage-not-filled").removeClass("procentage-filled");
                $("#energy-ball-4").addClass("procentage-not-filled").removeClass("procentage-filled");
                $("#energy-ball-5").addClass("procentage-not-filled").removeClass("procentage-filled");

                let energy_level = catBreedList[currentCatBreed].energy_level;
                // console.log("intell " + intellignece_level);
                if (energy_level >= 1) {
                    $("#energy-ball-1").removeClass("procentage-not-filled").addClass("procentage-filled");
                }
                if (energy_level >= 2) {
                    $("#energy-ball-2").removeClass("procentage-not-filled").addClass("procentage-filled");
                }
                if (energy_level >= 3) {
                    $("#energy-ball-3").removeClass("procentage-not-filled").addClass("procentage-filled");
                }
                if (energy_level >= 4) {
                    $("#energy-ball-4").removeClass("procentage-not-filled").addClass("procentage-filled");
                }
                if (energy_level >= 5) {
                    $("#energy-ball-5").removeClass("procentage-not-filled").addClass("procentage-filled");
                }

                // $('#vocal').html("<b>Vocalisation:</b>  " + vocalisation_level);
            } else {
                // $('#energy').html("<b>Energy level:</b> unknown");
                // console.log("nooooooooooo ");
            }

            //  shedding property
            if (catBreedList[currentCatBreed].hasOwnProperty("shedding_level")) {
                // clear intelligence bar
                $("#shedding-ball-1").addClass("procentage-not-filled").removeClass("procentage-filled");
                $("#shedding-ball-2").addClass("procentage-not-filled").removeClass("procentage-filled");
                $("#shedding-ball-3").addClass("procentage-not-filled").removeClass("procentage-filled");
                $("#shedding-ball-4").addClass("procentage-not-filled").removeClass("procentage-filled");
                $("#shedding-ball-5").addClass("procentage-not-filled").removeClass("procentage-filled");

                let shedding_level = catBreedList[currentCatBreed].shedding_level;
                // console.log("intell " + intellignece_level);
                if (shedding_level >= 1) {
                    $("#shedding-ball-1").removeClass("procentage-not-filled").addClass("procentage-filled");
                }
                if (shedding_level >= 2) {
                    $("#shedding-ball-2").removeClass("procentage-not-filled").addClass("procentage-filled");
                }
                if (shedding_level >= 3) {
                    $("#shedding-ball-3").removeClass("procentage-not-filled").addClass("procentage-filled");
                }
                if (shedding_level >= 4) {
                    $("#shedding-ball-4").removeClass("procentage-not-filled").addClass("procentage-filled");
                }
                if (shedding_level >= 5) {
                    $("#shedding-ball-5").removeClass("procentage-not-filled").addClass("procentage-filled");
                }

                // $('#vocal').html("<b>Vocalisation:</b>  " + vocalisation_level);
            } else {
                // $('#energy').html("<b>Energy level:</b> unknown");
                // console.log("nooooooooooo ");
            }

            // grooming property
            if (catBreedList[currentCatBreed].hasOwnProperty("grooming")) {
                // clear intelligence bar
                $("#grooming-ball-1").addClass("procentage-not-filled").removeClass("procentage-filled");
                $("#grooming-ball-2").addClass("procentage-not-filled").removeClass("procentage-filled");
                $("#grooming-ball-3").addClass("procentage-not-filled").removeClass("procentage-filled");
                $("#grooming-ball-4").addClass("procentage-not-filled").removeClass("procentage-filled");
                $("#grooming-ball-5").addClass("procentage-not-filled").removeClass("procentage-filled");

                let grooming_level = catBreedList[currentCatBreed].grooming;
                // console.log("intell " + intellignece_level);
                if (grooming_level >= 1) {
                    $("#grooming-ball-1").removeClass("procentage-not-filled").addClass("procentage-filled");
                }
                if (grooming_level >= 2) {
                    $("#grooming-ball-2").removeClass("procentage-not-filled").addClass("procentage-filled");
                }
                if (grooming_level >= 3) {
                    $("#grooming-ball-3").removeClass("procentage-not-filled").addClass("procentage-filled");
                }
                if (grooming_level >= 4) {
                    $("#grooming-ball-4").removeClass("procentage-not-filled").addClass("procentage-filled");
                }
                if (grooming_level >= 5) {
                    $("#grooming-ball-5").removeClass("procentage-not-filled").addClass("procentage-filled");
                }

                // $('#vocal').html("<b>Vocalisation:</b>  " + vocalisation_level);
            } else {
                // $('#energy').html("<b>Energy level:</b> unknown");
                // console.log("nooooooooooo ");
            }

            // affection_level affection property
            if (catBreedList[currentCatBreed].hasOwnProperty("affection_level")) {
                // clear intelligence bar
                $("#affection-ball-1").addClass("procentage-not-filled-affection").removeClass("procentage-filled-affection");
                $("#affection-ball-2").addClass("procentage-not-filled-affection").removeClass("procentage-filled-affection");
                $("#affection-ball-3").addClass("procentage-not-filled-affection").removeClass("procentage-filled-affection");
                $("#affection-ball-4").addClass("procentage-not-filled-affection").removeClass("procentage-filled-affection");
                $("#affection-ball-5").addClass("procentage-not-filled-affection").removeClass("procentage-filled-affection");

                let affection_level = catBreedList[currentCatBreed].affection_level;
                // console.log("intell " + intellignece_level);
                if (affection_level >= 1) {
                    $("#affection-ball-1").removeClass("procentage-not-filled-affection").addClass("procentage-filled-affection");
                }
                if (affection_level >= 2) {
                    $("#affection-ball-2").removeClass("procentage-not-filled-affection").addClass("procentage-filled-affection");
                }
                if (affection_level >= 3) {
                    $("#affection-ball-3").removeClass("procentage-not-filled-affection").addClass("procentage-filled-affection");
                }
                if (affection_level >= 4) {
                    $("#affection-ball-4").removeClass("procentage-not-filled-affection").addClass("procentage-filled-affection");
                }
                if (affection_level >= 5) {
                    $("#affection-ball-5").removeClass("procentage-not-filled-affection").addClass("procentage-filled-affection");
                }

                // $('#vocal').html("<b>Vocalisation:</b>  " + vocalisation_level);
            } else {
                // $('#energy').html("<b>Energy level:</b> unknown");
                // console.log("nooooooooooo ");
            }

            if (catBreedList[currentCatBreed].hasOwnProperty("life_span")) {
                $('#life-span').html("<b>Life span:</b>  " + catBreedList[currentCatBreed].life_span + " years");
            } else {
                $('#life-span').html("<b>Life span:</b> unknown");
            }

        }
    } else {
        console.log("Cat breed list is empty");
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