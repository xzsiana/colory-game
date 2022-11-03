const buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

document.querySelector("body").addEventListener("keyup", function() {
  if (!started) {
      document.querySelector(".level-title").textContent = "Level " + level;
      nextSequence();
      started = true;
    } 
  }
);

    const buttons = document.querySelectorAll(".btn");
    for (btn of buttons){
      btn.addEventListener("click", function() {
      let userChosenColour = this.getAttribute("id");
        userClickedPattern.push(userChosenColour);
      playSound(userChosenColour);
      animatePress(userChosenColour);
      checkAnswer(userClickedPattern.length-1);
      }
    );
  }

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      document.body.classList.add("game-over");
      document.querySelector("#level-title").textContent = "Game Over, Press Any Key to Restart";
      setTimeout(function () {
        document.body.classList.remove("game-over");
      }, 1000);
      startOver();
    }
}

// generate random sequence and limit levels
function nextSequence() {
  if (level <= 9){
    userClickedPattern = [];
    level ++;
    document.querySelector(".level-title").textContent = "Level " + level;
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour); 
    document.querySelector("#" + randomChosenColour).classList.add("fadeIn");
    setTimeout(function(){
      document.querySelector("#" + randomChosenColour).classList.remove("fadeIn");
    },100);
    playSound(randomChosenColour);
  } else {
    playSound("clap");
    document.body.classList.add("you-won");
    document.querySelector("#level-title").textContent = "Congratulations! You won.";
    setTimeout(function () {
      document.body.classList.remove("you-won");
    }, 2000);
    startOver();
  } console.log(gamePattern);
}

// animate user-pressed colors 
  function animatePress(currentColor) {
    document.querySelector("#" + currentColor).classList.add("pressed");
    setTimeout(function () {
      document.querySelector("#" + currentColor).classList.remove("pressed");
    },100);
  }
  
// add sound effects per color 
  function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }
  
// game restart  
  function startOver() {
    level = 0;
    gamePattern = [];
    started = false; 
    // userClickedPattern.setAttribute ('disabled', 'disabled');
    // gamePattern.setAttribute ('disabled', 'disabled');
  }
  