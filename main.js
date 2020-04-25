/*play sound*/
function playSound(name){
  var playSound = new Audio("sounds/" + name + ".mp3");
  playSound.play();
}

/* button animation*/
function animateButton (currentColour){
  $("#"+ currentColour).addClass("pressed");
  setTimeout(function(){
  $("#"+ currentColour).removeClass("pressed") }, 100);
}

/* add new sequence to game pattern*/
var gamePattern = [];
var lvl = 0;
var buttonColours= ["green", "red", "yellow", "blue"];

function nextSequence(){
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenButton = buttonColours[randomNumber];
  gamePattern.push(randomChosenButton);
  $("#"+randomChosenButton).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenButton);
  /*increasing level*/
  lvl++;
  $("#level-title").text("Level:" + lvl);
}

/* user answer*/
var userClickedPattern = [];

$(".btn").click(function(event) {
  var userChosenButton = event.target.id;
  userClickedPattern.push(userChosenButton);
  playSound(userChosenButton);
  animateButton(userChosenButton);
  checkAnswer();
});

/*detected start of the game*/

$(document).keypress(function(event){
  var startGame = event.which;
  if(startGame == 97 ){
    nextSequence();
  }
});

/*check user answer*/
var checkNumber=0;

function checkAnswer(){
        if(userClickedPattern[checkNumber]==gamePattern[checkNumber]){
            checkNumber++;
            if(userClickedPattern.length === gamePattern.length){
              checkNumber = 0
              userClickedPattern=[];
              setTimeout(function(){nextSequence()}, 400);
            }
        }else{
          gameOver();
        }
    }


/*game over*/
function gameOver(){
  var wrong = new Audio("sounds/wrong.mp3");
  wrong.play();

  $("body").addClass("game-over");
  $("#level-title").text("Game Over")

  setTimeout(function(){
    $("body").removeClass("game-over");
    gameReset();},500);

}


/*rest game*/
function gameReset(){
    lvl = 0;
    checkNumber=0;
    gamePattern = [];
    userClickedPattern = [];
    $("#level-title").text("Press A Key To Start ");

}
