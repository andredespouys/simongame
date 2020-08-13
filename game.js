//Array of possible options/colors
var buttonColours = ["red", "blue", "green", "yellow"];

//Array that saves the patern->game sequence
var gamePattern = [];

//Array of user's pattern
var userClickedPattern = [];

//Variable of Starting Game
var started = false;

//Level's  Variable
var level = 0;



//Start Game if key Pressed
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    //Here you get sure that no other key will activate the pattern
    started = true;
  }
});

// User's Pattern
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);

});

//Check answer
function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("Success");

    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key To Restart");
    startOver();
  }
}

//Generate de Auto Pattern
function nextSequence() {

  userClickedPattern = [];
  level++;
  $("#level-title").text("LEVEL" + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  //Selecting the RIGHT button and styling it, making sound, etc
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

//Generate sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Generate Animation
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//Start Over & Reset Initial Values
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
