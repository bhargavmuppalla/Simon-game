var level = 0;
var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

//Key event handler
$(document).keydown(function(){
  if(level == 0){

    nextButtonToClick();
  }
});

//Buttons event handler
$("div.btn").click(function(){clickHandler(event)});

function nextButtonToClick(){
  var randomChosenColour = buttonColours[nextSequence()];
  gamePattern.push(randomChosenColour);

  console.log(randomChosenColour);

  $("#"+randomChosenColour).fadeOut(30);
  $("#"+randomChosenColour).fadeIn();

  playSound(randomChosenColour);
}

function nextSequence(){
    userClickedPattern = [];
    var randomVariable = Math.floor(Math.random()*4);
    level += 1;
    $("h1").text("Level "+ level);
    return randomVariable;
}

function clickHandler(e){
  //console.log(e);
  var userChosenColour = e.target.id;
  userClickedPattern.push(userChosenColour);
  //console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  if(gamePattern.length == userClickedPattern.length){
    if(checkAnswer()){
      setTimeout(nextButtonToClick,1000);
      //nextButtonToClick();
    }
    else{
      $("h1").text("Game Over, Press Any Key to Restart");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){$("body").removeClass("game-over")},200);
      startOver();
      console.log("wrong!");
    }
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
function checkAnswer(){
  for(var i = 0; i < gamePattern.length; i++){
    if(gamePattern[i] != userClickedPattern[i])
      return false;
  }
  console.log(gamePattern+" "+userClickedPattern);
  console.log("Sucess!");
  return true;
}

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setInterval(function(){$("#"+currentColor).removeClass("pressed")},100);
}
