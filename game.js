var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;

$(document).on("keypress", function(e){
    if(e.key === 'a'){
        nextSequence();
    }
});

$(".btn").on("click", function(){
    var userChosenColor = this.getAttribute("id");
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    animatePress(randomChosenColor);
    playSound(randomChosenColor);
}

function playSound(name) {
    var playSound = new Audio("./sounds/" + name + ".mp3");
    playSound.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        console.log("right");
        if (userClickedPattern.length == gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    } else {
         console.log("wrong");
         $("h1").text("Game Over, Press Any Key to Restart");
         $("body").addClass("game-over");
         setTimeout(function(){
            $("body").removeClass("game-over");
         }, 200);
         var wrongSound = new Audio("./sounds/wrong.mp3");
         wrongSound.play();
         $(document).on("keypress", function() {
            gamePattern = [];
            level = 0;
            nextSequence();
         });
    }
}

