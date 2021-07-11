var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
})




function nextSequence() {
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);


    //step 3 
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);


    playSound(randomChosenColour)
    userClickedPattern = [];
}


//For playing sound on button click
function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// for animating the button click
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


// Starting the game
$("body").keypress(function (event) {

    if (!started) {
        nextSequence();
        started = true;
    }

})


function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (currentLevel === gamePattern.length - 1) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }

    console.log(userClickedPattern[currentLevel]);
    console.log(gamePattern[currentLevel]);
}

function startOver() {
    $("h1").text("You lost😔! Play the game again by pressing any key");
    level = 0;
    gamePattern = [];
    started = false;
}