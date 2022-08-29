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

// cat images from the welcome section
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

initializeCatBreedList();

// initializes the cat breed list with the api response
function initializeCatBreedList() {
    $.ajax(settingsBreed).done(function(response) {
        // console.log("Cat breed list length: " + response.length);
        catBreedList = response;
        console.log(catBreedList[0]);
        // console.log(catBreedList[1]);
        currentCatBreed = 0;
        populateCatBreedCard();
    });
}

// modify thre friendliness levels accordingly to the needed property
function displayFriendlynessLevel(friendlinessLevel = -1, propertyId = "", nameOfProperty = "") {
    if (friendlinessLevel != -1 && propertyId != "" && nameOfProperty != "") {
        let level;
        switch (friendlinessLevel) {
            case 1:
                level = "not so friendly";
                break;
            case 2:
                level = "a little friendly";
                break;
            case 3:
                level = "mildly friendly";
                break;
            case 4:
                level = "friendly";
                break;
            case 5:
                level = "very friendly";
                break;
            default:
                level = "unknown";
        }
        // sets the text of the element with the provided ID to the corresponding one
        $("#" + propertyId).html("<b>Around</b> " + "<b> " + nameOfProperty + ":</b> " + level);
    }
}


// function to modify the ballpoint levels for different properties that exist for each breed
function fillCharacteristicsLevels(propertyNameFromId = "", propertyInCatBreedArray = "") {
    let procentageFilled = "procentage-filled";
    let procentageNotFilled = "procentage-not-filled";

    // if the current cat caracteristic is affection, the class that changes the ballpoints color is a different one
    if (propertyInCatBreedArray === "affection_level") {
        procentageFilled = "procentage-filled-affection";
        procentageNotFilled = "procentage-not-filled-affection";
    }
    if (propertyNameFromId != "" && propertyInCatBreedArray != "") {
        // resets all 5 ballpoints to not be filled with color, accordingly to the wanted characteristic
        $("#" + propertyNameFromId + "-ball-1").addClass(procentageNotFilled).removeClass(procentageFilled);
        $("#" + propertyNameFromId + "-ball-2").addClass(procentageNotFilled).removeClass(procentageFilled);
        $("#" + propertyNameFromId + "-ball-3").addClass(procentageNotFilled).removeClass(procentageFilled);
        $("#" + propertyNameFromId + "-ball-4").addClass(procentageNotFilled).removeClass(procentageFilled);
        $("#" + propertyNameFromId + "-ball-5").addClass(procentageNotFilled).removeClass(procentageFilled);

        // get property level from the current cat breed array item 
        let property_level = -1;
        property_level = catBreedList[currentCatBreed][propertyInCatBreedArray];
        console.log(propertyNameFromId + " property level " + property_level);

        if (property_level >= 1) {
            $("#" + propertyNameFromId + "-ball-1").removeClass(procentageNotFilled).addClass(procentageFilled);
        }
        if (property_level >= 2) {
            $("#" + propertyNameFromId + "-ball-2").removeClass(procentageNotFilled).addClass(procentageFilled);
        }
        if (property_level >= 3) {
            $("#" + propertyNameFromId + "-ball-3").removeClass(procentageNotFilled).addClass(procentageFilled);
        }
        if (property_level >= 4) {
            $("#" + propertyNameFromId + "-ball-4").removeClass(procentageNotFilled).addClass(procentageFilled);
        }
        if (property_level >= 5) {
            $("#" + propertyNameFromId + "-ball-5").removeClass(procentageNotFilled).addClass(procentageFilled);
        }

        // reset the class that changes the ballpoints color to the default one == green color
        procentageFilled = "procentage-filled";
        procentageNotFilled = "procentage-not-filled";
    } else {

    }
}

// populates the cat breed card accordingly to the current breeed index
function populateCatBreedCard() {
    // makes sure the cat breed array curend index isn't out of bounds
    if (catBreedList != null) {
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

            // set the cat breed name
            if (catBreedList[currentCatBreed].hasOwnProperty("name")) {
                $("#cat-breed-name").text(catBreedList[currentCatBreed].name);
            } else {
                $("#cat-breed-name").text("...");
            }

            // set the description text
            if (catBreedList[currentCatBreed].hasOwnProperty("description")) {
                $('#cat-description').text(catBreedList[currentCatBreed].description);
            } else {
                $('#cat-description').text("Description: ...");
            }

            // set the origin 
            if (catBreedList[currentCatBreed].hasOwnProperty("origin")) {
                $('#origin').html("<b>Origin:</b>  " + catBreedList[currentCatBreed].origin);
            } else {
                $('#origin').html("<b>Origin:</b> unknown");
            }

            // set the information url
            if (catBreedList[currentCatBreed].hasOwnProperty("wikipedia_url")) {
                $('#wikipedia-link').attr("href", catBreedList[currentCatBreed].wikipedia_url);
            } else {
                $('#wikipedia-link').attr("href", "#");
            }

            // set the weight 
            if (catBreedList[currentCatBreed].hasOwnProperty("weight")) {
                $('#weight').html("<b>Weight:</b>  " + catBreedList[currentCatBreed].weight.metric + " kg");
            } else {
                $('#weight').html("<b>Weight:</b> unknown");
            }

            // set the temperament characteristics
            if (catBreedList[currentCatBreed].hasOwnProperty("temperament")) {
                $('#temperament').html("<b>Temperament:</b>  " + catBreedList[currentCatBreed].temperament);
            } else {
                $('#temperament').html("<b>Temperament:</b> unknown");
            }

            // set friendly around children property
            if (catBreedList[currentCatBreed].hasOwnProperty("child_friendly")) {
                displayFriendlynessLevel(catBreedList[currentCatBreed].child_friendly, "around-children", "children");
            } else {
                $('#around-children').html("<b>Around children:</b> unknown");
            }

            // set friendly around dogs property
            if (catBreedList[currentCatBreed].hasOwnProperty("dog_friendly")) {
                displayFriendlynessLevel(catBreedList[currentCatBreed].dog_friendly, "around-dogs", "dogs");
            } else {
                $('#around-dogs').html("<b>Around dogs:</b> unknown");
            }

            // set friendly around strangers property
            if (catBreedList[currentCatBreed].hasOwnProperty("stranger_friendly")) {
                displayFriendlynessLevel(catBreedList[currentCatBreed].stranger_friendly, "around-strangers", "strangers");
            } else {
                $('#around-strangers').html("<b>Around strangers:</b> unknown");
            }

            // set vocalisation property
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
                // set the vocalisation level text to the element
                $('#vocal').html("<b>Vocalisation:</b>  " + vocalisation_level);
            } else {
                $('#vocal').html("<b>Vocalisation:</b> unknown");
            }

            // set intellignece property
            if (catBreedList[currentCatBreed].hasOwnProperty("intelligence")) {
                // call filling levels function with the name used in the ballpoints id and the object property from the cat breed list 
                fillCharacteristicsLevels("intelligence", "intelligence");
            } else {
                $("#intelligence-level-text").html("<b>Intelligence level: </b> unknown");
            }

            // set energy property
            if (catBreedList[currentCatBreed].hasOwnProperty("energy_level")) {
                // call filling levels function with the name used in the ballpoints id and the object property from the cat breed list 
                fillCharacteristicsLevels("energy", "energy_level");
            } else {
                $("#energy-level-text").html("<b>Energy level: </b> unknown");
            }

            // set shedding property
            if (catBreedList[currentCatBreed].hasOwnProperty("shedding_level")) {
                // call filling levels function with the name used in the ballpoints id and the object property from the cat breed list 
                fillCharacteristicsLevels("shedding", "shedding_level");
            } else {
                $("#shedding-level-text").html("<b>Shedding level: </b> unknown");
            }

            // set grooming property
            if (catBreedList[currentCatBreed].hasOwnProperty("grooming")) {
                // call filling levels function with the name used in the ballpoints id and the object property from the cat breed list 
                fillCharacteristicsLevels("grooming", "grooming");
            } else {
                $("#grooming-level-tex").html("<b>Grooming level: </b> unknown");
            }

            // set affection property
            if (catBreedList[currentCatBreed].hasOwnProperty("affection_level")) {
                // call filling levels function with the name used in the ballpoints id and the object property from the cat breed list 
                fillCharacteristicsLevels("affection", "affection_level");
            } else {
                $("#affection-level-text").html("<b>Affection level: </b> unknown");
            }

            // set life span property
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
// is called by user clicking the cat breeed card buttons
function changeCatBreedCard(event) {
    // verify from which button the function was called
    if (event.target.id === "previous-cat-breed-btn") {
        // if (currentCatBreed - 1 >= 0) {
        //     currentCatBreed -= 1;
        // }
        // populateCatBreedCard();
        changeCurrentCatBreed(0);
    } else if (event.target.id === "next-cat-breed-btn") {
        // if (currentCatBreed + 1 <= catBreedList.length - 1) {
        //     currentCatBreed += 1;
        // }
        // populateCatBreedCard();
        changeCurrentCatBreed(1);
    }
}

// change the info from cat breed card to the next or previous cat breed
function changeCurrentCatBreed(action = 2) {
    // 0 == previous cat breed, 1 == next cat breed
    if (action === 0) {
        if (currentCatBreed - 1 >= 0) {
            currentCatBreed -= 1;
        }
        populateCatBreedCard();
    } else if (action === 1) {
        if (currentCatBreed + 1 <= catBreedList.length - 1) {
            currentCatBreed += 1;
        }
        populateCatBreedCard();
    }
}

// user clicks left or right arrow when cat card is visible
function handleUserArrowClick(arrowPressed = "") {
    if (arrowPressed === "ArrowLeft" && !cat_card_box.classList.contains("hide")) {
        changeCurrentCatBreed(0);
    } else if (arrowPressed === "ArrowRight" && !cat_card_box.classList.contains("hide")) {
        changeCurrentCatBreed(1);
    }
}

// see when the user presses side arrow keys
document.onkeydown = function(e) {
    switch (e.key) {
        case 'ArrowLeft':
            // left arrow
            console.log("left");
            handleUserArrowClick(e.key);
            break;
        case 'ArrowRight':
            // right arrow
            console.log("right");
            handleUserArrowClick(e.key);
    }
};

// set intervals for Welcome area images changing
// setInterval(changeCatImage1, 4000);
// setInterval(changeCatImage2, 7000);
// setInterval(changeCatImage3, 9000);

// change the 3 cat images from the description area with some new ones
changeCatImage1();
changeCatImage2();
changeCatImage3();
// changeCatImage4();

// comment for testing ssh key after making repo public and back to private

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

// function changeCatImage4() {
//     $.ajax(settings).done(function(response) {
//         $("#cat-img4").attr("src", response[0].url);
//     });
// }

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
    }
}