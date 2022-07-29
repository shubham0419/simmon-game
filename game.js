
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gameStarted = false;
var level = 0;
// start game
$(document).keypress(function() {
    if(!gameStarted){
        $("#level-title").text("Level "+level);
        nextSequence();
        gameStarted=true;
    }
});
// User color click
$(".btn").click(function() {
    var userChosenColour  = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});
// restat
function startOver(){
  gameStarted = false;
  level = 0;
  gamePattern = [];
}
// checking color
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (gamePattern.length === userClickedPattern.length){
        setTimeout(nextSequence(),1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver()
    }
}
// next color
function nextSequence() {
    // clearing user answer
    userClickedPattern = [];
    // level upgrade
    level++;
    $("#level-title").text("Level "+level);
    // choosing random color
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    // flash effect and animation
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
// Sound Production
function playSound(name) {
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}
//  Animation
function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");

    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
    },100);
}
