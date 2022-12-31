
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];

var userClickedPattern = [];
var isStarted = false;
var level = 0;
//mouse click
$(".btn").click(function(){

  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  // console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer();
});

function checkAnswer()
{
  var userIndex = userClickedPattern.length-1;
  if(gamePattern[userIndex] == userClickedPattern[userIndex])
  {
    //if both become of same length you have to go on next Level
    if(gamePattern.length == userClickedPattern.length)
    {
        setTimeout(function(){
          nextSequence();
        },1000);
    }
  }
  else
  {
    playSound("wrong");

    $("h1").text("Game Over, Press Any Key to Restart");

    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    startOver();
  }
}

function startOver(){
  level = 0;
  userClickedPattern = [];
  gamePattern = [];
  isStarted = false;
}

//keyboard click
$(document).keydown(function(event){
  if(isStarted == false)
  {
    nextSequence();
    isStarted = true;
  }
});


function nextSequence()
{
  //make userClickedPattern empty for each level so that comparison can be done according to last index
  userClickedPattern = [];

  level++;

  $("h1").html("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);  // 0 - 3

  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name)  // name of color
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor)
{
  $("#" + currentColor).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  },100);
}
